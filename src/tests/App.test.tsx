import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterAndRedux from './utils/renderWithRouterAndRedux';


const PERSONAL_DATA =  {
  name: 'Nome Teste',
  email: 'email@teste.com',
  cpf: '123.456.789-00',
  address: 'Rua Teste',
  city: 'Cidade Teste',
  uf: 'Amapá',
};

const PROFESSIONAL_DATA = {
  resume: 'Currículo Teste',
  role: 'Cargo Teste',
  description: 'Descrição Teste',
};

async function fillPersonalForm() {
  const nameInput = screen.getByLabelText(/nome/i);
  const emailInput = screen.getByLabelText(/email/i);
  const cpfInput = screen.getByLabelText(/cpf/i);
  const addressInput = screen.getByLabelText(/endereço/i);
  const cityInput = screen.getByLabelText(/cidade/i);
  const stateInput = screen.getByLabelText(/estado/i);

  await userEvent.type(nameInput, PERSONAL_DATA.name);
  await userEvent.type(emailInput, PERSONAL_DATA.email);
  await userEvent.type(cpfInput, PERSONAL_DATA.cpf);
  await userEvent.type(addressInput, PERSONAL_DATA.address);
  await userEvent.type(cityInput, PERSONAL_DATA.city);
  await userEvent.selectOptions(stateInput, PERSONAL_DATA.uf);
}

async function fillProfessionalForm() {
  const resumeInput = screen.getByLabelText(/currículo/i);
  const roleInput = screen.getByLabelText('Cargo:');
  const descriptionInput = screen.getByLabelText(
    /descrição do cargo/i
  );

  await userEvent.type(resumeInput, 'Currículo Teste');
  await userEvent.type(roleInput, 'Cargo Teste');
  await userEvent.type(descriptionInput, 'Descrição Teste');
}


describe('01 - Implementando as rotas e estrutura das páginas', () => {
  it('Possui o botão "preencher formulário" na home', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /preencher formulário/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('Renderiza formulário pessoal na rota "personal-form"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/personal-form'] });

    const title = await screen.findByRole('heading', {
      name: /informações pessoais/i,
    });
    expect(title).toBeInTheDocument();

    // encontra o input de nome
    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toBeInTheDocument();

    // encontra o input de email
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    // encontra o input de cpf
    const cpfInput = screen.getByLabelText(/cpf/i);
    expect(cpfInput).toBeInTheDocument();

    // encontra o input de endereço
    const addressInput = screen.getByLabelText(/endereço/i);
    expect(addressInput).toBeInTheDocument();

    // encontra o input de cidade
    const cityInput = screen.getByLabelText(/cidade/i);
    expect(cityInput).toBeInTheDocument();

    // encontra o input de estado
    const stateInput = screen.getByLabelText(/estado/i);
    expect(stateInput).toBeInTheDocument();
  });

  it('Renderiza formulário profissional na rota "professional-form"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/professional-form'] });

    const title = screen.getByRole('heading', {
      name: /informações profissionais/i,
    });
    expect(title).toBeInTheDocument();

    // encontra o input de resumo do currículo
    const resumeInput = screen.getByLabelText(/resumo do currículo/i);
    expect(resumeInput).toBeInTheDocument();

    // encontra o input de cargo
    const roleInput = screen.getByRole('textbox', { name: 'Cargo:' });
    expect(roleInput).toBeInTheDocument();

    // encontra o input de descrição do cargo
    const roleDescriptionInput = screen.getByRole('textbox', {
      name: 'Descrição do cargo:',
    });
    expect(roleDescriptionInput).toBeInTheDocument();
  });

  it ('Botão da Home redireciona corretamente para o formulário de dados pessoais', async () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /preencher formulário/i,
    });
    
    await userEvent.click(button);

    const title = await screen.findByRole('heading', {
      name: /informações pessoais/i,
    });

    expect(title).toBeInTheDocument();
  });

  it('Formulário de dados pessoais redireciona corretamente para o formulário de dados profissionais quando está preenchido', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/personal-form'] });

    // preenche formulário de informações pessoais
    await fillPersonalForm();
    
    // clica no botão
    const button = screen.getByRole('button', { name: /próximo/i });
    await userEvent.click(button);
    
    // verifica se o título "informações profissionais" foi renderizado
    const title = await screen.findByRole('heading', {
      name: /informações profissionais/i,
    });
    expect(title).toBeInTheDocument();
  });

  it("Formulário de dados pessoais não redireciona para o formulário de dados profissionais quando não está preenchido", async () => {  
    renderWithRouterAndRedux(<App />, { initialEntries: ['/personal-form'] });

    // clica no botão
    const button = screen.getByRole('button', { name: /próximo/i });
    await userEvent.click(button);

    // verifica se o título "informações profissionais" não foi renderizado
    const title = screen.queryByRole('heading', {
      name: /informações profissionais/i,
    });
    expect(title).not.toBeInTheDocument();
  });
  

  it('Formulário de dados profissionais redireciona corretamente para o a tela de resumo das informações quando está preenchido', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/professional-form'] });

    // preenche formulário de informações profissionais
    await fillProfessionalForm();

    // clica no botão
    const button = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(button);

    // verifica se o título "Dados Enviados" foi renderizado
    const title = screen.getByRole('heading', { name: /Dados Enviados/i });
    expect(title).toBeInTheDocument();
  });


  it("Formulário de dados profissionais não redireciona para a tela de resumo das informações quando não está preenchido", async () => {  
    renderWithRouterAndRedux(<App />, { initialEntries: ['/professional-form'] });

    // clica no botão
    const button = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(button);

    // verifica se o título "informações profissionais" não foi renderizado
    const title = screen.queryByRole('heading', {
      name: /Dados Enviados/i,
    });
    expect(title).not.toBeInTheDocument();
  });



});

describe('02 - Implementando o Redux', () => {
  it('Possui a estrutura correta do estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    expect(store.getState()).toEqual({
      personalData: {
        name: '',
        email: '',
        cpf: '',
        address: '',
        city: '',
        uf: '',
      },
      professionalData: {
        resume: '',
        role: '',
        description: '',
      },
    });
  });
});

describe('03 - Salvando as informações', () => {
  it('O primeiro formulário salva no estado global', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/personal-form'] }
    );
    
    vi.spyOn(store, 'dispatch');

    // preenche formulário de informações pessoais
    await fillPersonalForm();

    // clica no botão
    const button = screen.getByRole('button', { name: /próximo/i });
    await userEvent.click( button);
    
    
    // verifica se o título foi renderizado
    const title = await screen.findByRole('heading', {
      name: /informações profissionais/i,
    });
    expect(title).toBeInTheDocument();

    // verifica se o estado global foi alterado
    expect(store.getState().personalData.name).toBe(PERSONAL_DATA.name);
    expect(store.getState().personalData.email).toBe(PERSONAL_DATA.email);
    expect(store.getState().personalData.cpf).toBe(PERSONAL_DATA.cpf);
    expect(store.getState().personalData.address).toBe(PERSONAL_DATA.address);
    expect(store.getState().personalData.city).toBe(PERSONAL_DATA.city);
    expect(store.getState().personalData.uf).toBe(PERSONAL_DATA.uf);
    expect(store.getState().professionalData).toEqual({
      resume: '',
      role: '',
      description: '',
    });

    // verifica se o dispatch foi chamado
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('O segundo formulário salva no estado global', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/professional-form'] }
    );

    vi.spyOn(store, 'dispatch');

    // preenche formulário de informações profissionais
    await fillProfessionalForm();

    // clica no botão
    const button = await screen.findByRole('button', { name: /enviar/i });
    await userEvent.click(button);

    // verifica se o título foi renderizado
    const title = await screen.findByRole('heading', {
      name: /Dados Enviados/i,
    });
    expect(title).toBeInTheDocument();

    // verifica se o estado global foi alterado
    expect(store.getState().professionalData).toStrictEqual({
      resume: PROFESSIONAL_DATA.resume,
      role: PROFESSIONAL_DATA.role,
      description: PROFESSIONAL_DATA.description,
    });
    expect(store.getState().personalData).toStrictEqual({
      name: '',
      email: '',
      cpf: '',
      address: '',
      city: '',
      uf: '',
    });

    // verifica se o dispatch foi chamado
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

describe('04 - Renderizando as informações', () => {
  it('Renderiza as informações na tela', async () => {
    const initialState = {
      personalData: PERSONAL_DATA,
      professionalData: PROFESSIONAL_DATA
    };

    renderWithRouterAndRedux(<App />, {
      initialState,
      initialEntries: ['/form-display'],
    });

    const name = await screen.findByText(/nome: nome teste/i);
    const email = await screen.findByText(/email: email@teste.com/i);
    const cpf = await screen.findByText(/cpf: 123.456.789-00/i);
    const address = await screen.findByText(/endereço: rua teste/i);
    const city = await screen.findByText(/cidade: cidade teste/i);
    const uf = await screen.findByText(/estado: amapá/i);
    const resume = await screen.findByText(/currículo: currículo teste/i);
    const role = await screen.findByText(/cargo: cargo teste/i);
    const description = await screen.findByText(
      /descrição do cargo: descrição teste/i
    );

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(cpf).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(uf).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
