// This file is still under development and may change in the future.

export function sanitizeText(input: string): string {
  let sanitized = input;

  // Fødselsnummer (11 siffer)
  sanitized = sanitized.replace(/\b\d{11}\b/g, '[REDACTED_FNR]');

  // Norsk telefonnummer (exactly 8 digits, starts with 4, 9, etc.)
  sanitized = sanitized.replace(/\b(4|9)\d{7}\b/g, '[REDACTED_PHONE_NO]');

  // Internasjonalt format med + eller 00
  sanitized = sanitized.replace(
    /\b(?:\+|00)[1-9]\d{6,14}\b/g,
    '[REDACTED_PHONE_INTL]',
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

  // Lokasjon – støtte for: "jeg er fra", "eg er frå", "æ e fra", "æ e frå", "i live in", "i'm from", "address is"
  sanitized = sanitized.replace(
    /\b(i live in|i am from|i'm from|adresse er|address is|bor i|bur i|bur på|mun lean eret)\s+[A-ZÆØÅa-zæøåáčđŋšŧžÁČĐŊŠŦŽ0-9.,\- ]+/gi,
    '[REDACTED_LOCATION]',
  );

  // Hilsen + navn – støtte for bokmål, nynorsk, engelsk og samisk
  sanitized = sanitized.replace(
    /\b(mvh|vh|hilsen|hlsn|hls|h:|helsing|med vennlig hilsen|med venleg helsing|vennlig hilsen|venleg helsing|beste hilsen|beste helsing|med beste helsing|regards|best regards|kind regards|sincerely|cheers|thanks|thank you|deavddus|heapme)[,:]?\s+[A-ZÆØÅÁČĐŊŠŦŽa-zæøåáčđŋšŧž\-'. ]{2,}/gi,
    '[REDACTED_NAME]',
  );

  // Postnummer + by
  sanitized = sanitized.replace(
    /\b\d{4}\s+[A-ZÆØÅa-zæøå\-]+/g,
    '[REDACTED_LOCATION]',
  );
  // Organisasjonsnummer (starter med 8 eller 9, 9 sifre, med eller uten mellomrom/bindestrek)
  sanitized = sanitized.replace(
    /\b[89]\d{2}[\s\-]?\d{3}[\s\-]?\d{3}\b/g,
    '[REDACTED_ORGNR]',
  );
  // D-nummer (11 sifre, første 2 sifre mellom 40–71, med/uten mellomrom/bindestrek)
  sanitized = sanitized.replace(
    /\b(4[0-9]|5[0-9]|6[0-9]|7[01])[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{5}\b/g,
    '[REDACTED_DNR]',
  );

  return sanitized;
}
