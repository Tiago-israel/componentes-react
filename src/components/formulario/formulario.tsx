import * as React from 'react';
import { IFormProps } from './interfaces/IFormState';
import HttpService from 'src/http-service/HttpService';
import './formulario.css';
import { IFormState } from './interfaces/IFormProps';
import { Pessoa } from './models/pessoa';

export default class Formulario extends React.Component<IFormProps, IFormState> {

    public httpService: HttpService = new HttpService('pessoas');
    public css = 'some style';

    public constructor(props: IFormProps) {
        super(props);
        this.salvar = this.salvar.bind(this);
        this.atualizarValorInput = this.atualizarValorInput.bind(this);
        this.state = {
            pessoa: new Pessoa()
        }
    }

    public salvar(): void {
        this.httpService.post('', this.state.pessoa);
    }

    public atualizarValorInput(event: any, campo: string): void {
        const pessoa = this.state.pessoa;
        pessoa[campo] = event.target.value;
        this.setState({ pessoa: pessoa });

    }

    public validarForm(): boolean {
        const pessoa = this.state.pessoa;
        if (pessoa.nome && pessoa.cpf) {
            return true;
        }
        return false;
    }

    public render(): JSX.Element {
        return (
            <div className="card">
                <form>
                    <div>
                        <label className="my-label">Nome:</label>
                        <input type="text" name="nome" id="nome" className="my-input" value={this.props.pessoa.nome} onChange={(event) => { this.atualizarValorInput(event, 'nome') }} />
                    </div>
                    <div>
                        <label className="my-label">Cpf:</label>
                        <input type="text" name="cpf" id="cpf" className="my-input" value={this.props.pessoa.cpf} onChange={(event) => { this.atualizarValorInput(event, 'cpf') }} />
                    </div>
                    <div>
                        <button type="button"  className="btn-salvar" onClick={this.salvar}>salvar</button>
                    </div>
                </form>
            </div>
        );
    }
}