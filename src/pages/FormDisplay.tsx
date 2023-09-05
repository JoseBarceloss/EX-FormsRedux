function FormDisplay() {
  // Recupere as informações do seu estado criado no Redux
  return (
    <section>
      <h1>Dados Enviados</h1>
      <div>
        Nome:
        {/* { name } */}
      </div>
      <div>
        Email:
        {/* { email } */}
      </div>
      <div>
        CPF:
        {/* { cpf } */}
      </div>
      <div>
        Endereço:
        {/* { address } */}
      </div>
      <div>
        Cidade:
        {/* { city } */}
      </div>
      <div>
        Estado:
        {/* { uf } */}
      </div>
      <div>
        Currículo:
        {/* { resume } */}
      </div>
      <div>
        Cargo:
        {/* { role } */}
      </div>
      <div>
        Descrição do cargo:
        {/* { description } */}
      </div>
    </section>
  );
}

export default FormDisplay;
