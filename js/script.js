document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const inputUrlEncode = document.getElementById('inputUrlEncode');
    const outputUrlEncode = document.getElementById('outputUrlEncode');
    const encodeBtn = document.getElementById('encodeBtn');
    const copyEncodeBtn = document.getElementById('copyEncodeBtn');

    const inputUrlDecode = document.getElementById('inputUrlDecode');
    const outputUrlDecode = document.getElementById('outputUrlDecode');
    const decodeBtn = document.getElementById('decodeBtn');
    const copyDecodeBtn = document.getElementById('copyDecodeBtn');

    // Characters to replace '.' and '/'
    const dotReplacement = '•';  // bullet character, uncommon in URLs
    const slashReplacement = '¦'; // broken bar character, uncommon in URLs

    function encodeUrl(url) {
        // Remove http:// or https://
        url = url.replace(/^https?:\/\//, '');

        // Replace spaces with _
        url = url.replace(/ /g, '_');

        // Replace '.' and '/'
        url = url.replace(/\./g, dotReplacement);
        url = url.replace(/\//g, slashReplacement);

        return url;
    }

    function decodeUrl(encoded) {
        // Check if starts with http:// or https://
        if (/^https?:\/\//.test(encoded)) {
            return 'Error: es un enlace codificado';
        }

        // Replace back custom characters
        let url = encoded.replace(new RegExp(dotReplacement, 'g'), '.');
        url = url.replace(new RegExp(slashReplacement, 'g'), '/');
        url = url.replace(/_/g, ' ');

        // Add https:// prefix back
        url = 'https://' + url;

        return url;
    }

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    encodeBtn.addEventListener('click', () => {
        const url = inputUrlEncode.value.trim();
        if (!url) {
            outputUrlEncode.textContent = 'Please enter a URL to encode.';
            showEncodeResult();
            return;
        }
        outputUrlEncode.textContent = encodeUrl(url);
        showEncodeResult();
    });

    function showEncodeResult() {
        document.getElementById('outputUrlEncode').style.display = 'block';
        document.getElementById('copyEncodeBtn').style.display = 'inline-block';
        document.querySelector('label[for="outputUrlEncode"]').style.display = 'block';
    }

    decodeBtn.addEventListener('click', () => {
        const encoded = inputUrlDecode.value.trim();
        if (!encoded) {
            outputUrlDecode.textContent = 'Please enter an encoded URL to decode.';
            showDecodeResult();
            return;
        }
        try {
            outputUrlDecode.textContent = decodeUrl(encoded);
            showDecodeResult();
        } catch (e) {
            outputUrlDecode.textContent = 'Invalid encoded URL.';
            showDecodeResult();
        }
    });

    function showDecodeResult() {
        document.getElementById('outputUrlDecode').style.display = 'block';
        document.getElementById('copyDecodeBtn').style.display = 'inline-block';
        document.querySelector('label[for="outputUrlDecode"]').style.display = 'block';
    }

    // Copy to clipboard with button color change
    function copyText(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            button.style.backgroundColor = 'green';
            setTimeout(() => {
                button.style.backgroundColor = '#007bff';
            }, 2000);
        });
    }

    copyEncodeBtn.addEventListener('click', () => {
        const text = outputUrlEncode.textContent;
        if (text) {
            copyText(text, copyEncodeBtn);
        }
    });

    copyDecodeBtn.addEventListener('click', () => {
        const text = outputUrlDecode.textContent;
        if (text) {
            copyText(text, copyDecodeBtn);
        }
    });
});
