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

function checkDocType(doc) {
  if (isValidCPF(doc)) {
    return "cpf";
  } else {
    return "cnpj";
  }
}

export { isValidCNPJ, isValidCPF, cleanDoc, checkDocType };
