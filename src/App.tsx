import * as React from 'react';
import './App.css';
import Table from './components/table/table';
import HttpService from './http-service/HttpService';
import Formulario from './components/formulario/formulario';
import { Pessoa } from './components/formulario/models/pessoa';

export default class App extends React.Component<any, any> {

  public httpService: HttpService = new HttpService('pessoas');

  public constructor(props: any) {
    super(props);
    this.state = {
      cols: [
        { name: "Id", property: "id" },
        { name: "Nome", property: "nome" },
        { name: "CPF", property: "cpf" },
        { name: 'Idade', property: "idade" }
      ]
    };
    this.httpService.delete(``, 3, () => { this.buscarPessoas() });
  }

  public buscarPessoas(): void {
    this.httpService.getAll(``, async response => {
      const dados = await response;
      this.setState({ rows: dados });
    });
  }

  public render(): JSX.Element {
    return (
      <div className="table-responsive">
        <Formulario pessoa={new Pessoa()} />
        <Table cols={this.state.cols} rows={this.state.rows} styles={"table table-striped table-bordered table-hover"} />
      </div>
    );
  }
}


