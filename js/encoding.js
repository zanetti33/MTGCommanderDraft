// Encodes/decodes the hidden "d" query param carried by player links.
// This is obfuscation, not security: anyone who base64-decodes the param
// can see all 3 assigned card ids. That's an accepted MVP limitation.
(function () {
  function encodePayload(cardIds) {
    const json = JSON.stringify({ c: cardIds });
    return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodePayload(param) {
    let b64 = param.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) {
      b64 += '=';
    }

    let obj;
    try {
      obj = JSON.parse(atob(b64));
    } catch (e) {
      throw new Error('Invalid draft data.');
    }

    if (
      !obj ||
      !Array.isArray(obj.c) ||
      obj.c.length !== 3 ||
      obj.c.some((id) => typeof id !== 'string')
    ) {
      throw new Error('Invalid draft data.');
    }

    return obj.c;
  }

  window.Encoding = { encodePayload, decodePayload };
})();
