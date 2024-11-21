function isValidCPF(cpf) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
  return cpfRegex.test(cpf);
}

function isValidCNPJ(cnpj) {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
  return cnpjRegex.test(cnpj);
}

function cleanDoc(cpf) {
  return cpf.replace(/\D/g, "");
}

export { isValidCNPJ, isValidCPF, cleanDoc };
function isValidCPF(cpf) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
}

function isValidCNPJ(cnpj) {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;
  return cnpjRegex.test(cnpj);
}

function cleanDoc(cpf) {
  return cpf.replace(/\D/g, "");
}

function checkDocType(doc) {
  if (isValidCPF(doc)) {
    return "cpf";
  } else if (isValidCNPJ(doc)) {
    return "cnpj";
  }
  return "invalid";
}

function applyCPFMask(cpf) {
  const cleanValue = cleanDoc(cpf);
  if (cleanValue.length <= 3) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/^(\d{3})(\d{1,3})/, "$1.$2");
  if (cleanValue.length <= 9) return cleanValue.replace(/^(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  return cleanValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

function applyCNPJMask(cnpj) {
  const cleanValue = cleanDoc(cnpj).slice(0, 14);
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 5) return cleanValue.replace(/^(\d{2})(\d{1,3})/, "$1.$2");
  if (cleanValue.length <= 8) return cleanValue.replace(/^(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
  if (cleanValue.length <= 12) return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})/, "$1.$2.$3/$4");
  return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, "$1.$2.$3/$4-$5");
}

export { isValidCNPJ, isValidCPF, cleanDoc, checkDocType, applyCPFMask, applyCNPJMask };
