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
        { name: 'Idade', property: "idade" },
        { name: 'Ações', property: "actions" }
      ]
    };
    this.buscarPessoas();
  }

  public buscarPessoas(): void {
    this.httpService.getAll(``, async response => {
      const dados = await response;
      this.setState({ rows: dados });
    });
  }

  public excluir = (obj: any) => {
    this.httpService.delete(``, obj.id, () => {
      this.buscarPessoas();
    })
  }

  public detalhes = (obj: any) => {
    console.log(obj);
  }

  public render(): JSX.Element {
    return (
      <div className="table-responsive">
        <Table
          filter={false}
          cols={this.state.cols}
          rows={this.state.rows}
          styles={"table table-striped table-bordered table-hover"}
          actions={[{
            label: 'Detalhes',
            styles: 'btn btn-info',
            handleAction: this.detalhes
          },
          {
            label: 'Excluir',
            styles: 'btn btn-danger',
            handleAction: this.excluir
          }]}
        />
      </div>
    );
  }
}
