import * as React from 'react';
import './App.css';
import Table from './components/table/table';
import HttpService from './http-service/HttpService';




export default class App extends React.Component<any, any> {

  public httpService: HttpService = new HttpService('pessoas');

  public constructor(props: any) {
    super(props);
    this.state = {
      cols: [
        { name: "Id", property: "id" },
        { name: "Nome", property: "nome" },
        { name: "CPF", property: "cpf" },
        {name:'Idade',property:"idade"}
      ]
    };
    this.buscarPessoas();
  }

  public async buscarPessoas() {
    const response = await this.httpService.getAll('');
    this.setState({ rows: response });
  }

  public render(): JSX.Element {
    return (
      <Table cols={this.state.cols} rows={this.state.rows} styles={"table table-striped"} />
    );
  }
}


