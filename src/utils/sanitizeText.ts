export function sanitizeText(input: string): string {
  let sanitized = input;

  // Fødselsnummer (11 siffer)
  sanitized = sanitized.replace(/\b\d{11}\b/g, '[REDACTED_FNR]');

  // Telefonnummer: +47, +XX eller lokale 8–10 sifre
  sanitized = sanitized.replace(
    /\+?\d{1,3}[\s\-]?\d{6,10}\b/g,
    '[REDACTED_PHONE]',
  );

  // E-post
  sanitized = sanitized.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    '[REDACTED_EMAIL]',
  );

  // Navn – støtte for: "jeg heter", "eg heiter", "æ heite", "my name is", "mun namma lea"
  sanitized = sanitized.replace(
    /\b(jeg heter|eg heiter|æ heite|æ hete|æ heiter|æ e|my name is|mun namma lea)\s+[A-ZÆØÅa-zæøåáčđŋšŧžÁČĐŊŠŦŽ\- ]+/gi,
    '[REDACTED_NAME]',
  );

  // Alder – støtte for: "jeg er", "eg er", "æ e", "i am"
  sanitized = sanitized.replace(
    /\b(jeg er|eg er|æ e|æ æ|i am)\s+\d{1,3}(\s*(år|år gammel|years old|years))?\b/gi,
    '[REDACTED_AGE]',
  );

  // Lokasjon – støtte for: "jeg er fra", "eg er frå", "æ e fra", "æ e frå", "i live in", "i'm from", "address is"
  sanitized = sanitized.replace(
    /\b(jeg er fra|eg er frå|æ e fra|æ e frå|æ e ifra|i live in|i am from|i'm from|adresse er|address is|bor i|bur i|bur på|mun lean eret)\s+[A-ZÆØÅa-zæøåáčđŋšŧžÁČĐŊŠŦŽ0-9.,\- ]+/gi,
    '[REDACTED_LOCATION]',
  );

  // Postnummer + by
  sanitized = sanitized.replace(
    /\b\d{4}\s+[A-ZÆØÅa-zæøå\-]+/g,
    '[REDACTED_LOCATION]',
  );

  return sanitized;
}
