// Validador central de correos y contraseñas
(function(){
	// Validar formato de correo con reglas adicionales (longitudes y labels)
	function isValidEmail(email) {
		if (!email || typeof email !== 'string') return false;
		email = email.trim();
		// longitud máxima total del correo según RFC
		if (email.length > 254) return false;
		// no permitir caracteres de control ni espacios
		if (/[\u0000-\u001f\u007f-\u009f\s]/.test(email)) return false;
		const parts = email.split('@');
		if (parts.length !== 2) return false;
		const local = parts[0];
		const domain = parts[1];
		if (!local || !domain) return false;
		// local-part length
		if (local.length > 64) return false;
		// local-part rules: no starting/ending with dot, no consecutive dots
		if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
		// allowed characters in local (reasonably permissive)
		const localRe = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~.-]+$/;
		if (!localRe.test(local)) return false;
		// domain total length
		if (domain.length > 253) return false;
		// no consecutive dots in domain
		if (domain.includes('..')) return false;
		const labels = domain.split('.');
		if (labels.length < 2) return false; // require at least one dot
		// each label 1..63, no leading/trailing hyphen, only alnum and hyphen
		const labelRe = /^[A-Za-z0-9-]+$/;
		for (let i = 0; i < labels.length; i++){
			const lab = labels[i];
			if (!lab || lab.length > 63) return false;
			if (lab.startsWith('-') || lab.endsWith('-')) return false;
			if (!labelRe.test(lab)) return false;
		}
		// TLD: last label at least 2 characters and contains a letter
		const tld = labels[labels.length-1];
		if (tld.length < 2 || !/[A-Za-z]/.test(tld)) return false;
		return true;
	}

	// Devuelve objeto con comprobaciones de requisitos de contraseña
	function checkPasswordRequirements(password) {
		const req = {
			length: false,
			uppercase: false,
			number: false,
			special: false
		};
		if (!password || typeof password !== 'string') return req;
		req.length = password.length >= 8;
		req.uppercase = /[A-Z]/.test(password);
		req.number = /[0-9]/.test(password);
		req.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		return req;
	}

	function isStrongPassword(password){
		const r = checkPasswordRequirements(password);
		return r.length && r.uppercase && r.number && r.special;
	}

	// --------------------------
	// Hashing de contraseñas (PBKDF2 via SubtleCrypto)
	// --------------------------
	function _toHex(buffer){
		return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,'0')).join('');
	}

	function _fromHex(hex){
		const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(b=>parseInt(b,16)));
		return bytes.buffer;
	}

	function generateSalt(len = 16){
		const array = new Uint8Array(len);
		crypto.getRandomValues(array);
		return _toHex(array.buffer);
	}

	async function _deriveKey(password, saltHex, iterations = 100000, hash = 'SHA-256'){
		const enc = new TextEncoder();
		const passKey = await crypto.subtle.importKey('raw', enc.encode(password), {name:'PBKDF2'}, false, ['deriveBits']);
		const saltBuf = _fromHex(saltHex);
		const params = {name:'PBKDF2', salt: saltBuf, iterations: iterations, hash: hash};
		const derived = await crypto.subtle.deriveBits(params, passKey, 256);
		return _toHex(derived);
	}

	// Devuelve {hash, salt}
	async function hashPassword(password){
		if (!password) return {hash:'', salt:''};
		const salt = generateSalt(16);
		const hash = await _deriveKey(password, salt);
		return {hash, salt};
	}

	async function verifyPassword(password, storedHash, storedSalt){
		if (!storedHash || !storedSalt) return false;
		const computed = await _deriveKey(password, storedSalt);
		return computed === storedHash;
	}

		// La checklist de requisitos se renderiza dentro del modal de registro
		// usando elementos presentes en el DOM: contenedor `passwordReqContainer`

	// Actualiza los checkboxes del contenedor de requisitos (password + email)
	function updateRequirementChecks(){
		const pwd = document.getElementById('registro-password') ? document.getElementById('registro-password').value : '';
		const email = document.getElementById('registro-email') ? document.getElementById('registro-email').value : '';
		const r = checkPasswordRequirements(pwd);
		const set = (id, value) => {
			const el = document.getElementById(id);
			if (el) el.checked = !!value;
		};
		set('pw_req_length', r.length);
		set('pw_req_upper', r.uppercase);
		set('pw_req_number', r.number);
		set('pw_req_special', r.special);
		// validación de email
		const emailValid = (typeof validateEmail === 'function') ? validateEmail(email) : false;
		set('req_email_valid', emailValid);
	}

	// Inicializa listeners en un input para mostrar/ocultar la checklist
	// dentro del modal de registro y actualizar sus checkboxes
	function initPasswordRequirementModal(inputId){
		const input = document.getElementById(inputId);
		if (!input) return;
		const container = document.getElementById('passwordReqContainer');
		if (container) container.style.display = 'none';

		const showContainer = () => { if (container) container.style.display = 'block'; };
		const hideContainerIfNeeded = () => {
			setTimeout(function(){
				const active = document.activeElement;
				if (!container) return;
				// mantener visible si el foco está dentro de container o en otro input relacionado
				if (container.contains(active) || active === input) return;
				// también mantener si el foco está en el otro password input
				const other = document.getElementById('registro-password-confirm');
				if (active === other) return;
				container.style.display = 'none';
			}, 100);
		};

		input.addEventListener('focus', function(){
			updateRequirementChecks();
			showContainer();
		});
		input.addEventListener('input', function(){
			updateRequirementChecks();
		});
		input.addEventListener('blur', function(){
			hideContainerIfNeeded();
		});
	}

	// Exponer funciones al scope global para uso por otros scripts
	window.validateEmail = isValidEmail;
	window.checkPasswordRequirements = checkPasswordRequirements;
	window.isStrongPassword = isStrongPassword;
	window.initPasswordRequirementModal = initPasswordRequirementModal;
	window.hashPassword = hashPassword;
	window.verifyPassword = verifyPassword;

})();

