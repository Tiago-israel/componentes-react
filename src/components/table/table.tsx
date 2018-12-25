import * as React from 'react';
import { ITableProps } from './interfaces/ITableProps';
import Botao from '../botao/botao'

export default class Table extends React.Component<ITableProps, any> {

    public constructor(props: ITableProps) {
        super(props);
        this.state = {
            rows: [],
            originalList: []
        }
        this.filtrar = this.filtrar.bind(this);
    }

    private carregarColunas(): JSX.Element {
        return (
            <tr>
                {
                    this.props.cols.map((col, key) => {
                        return <th key={key}>{col.name}</th>
                    })
                }
            </tr>
        )
    }

    private criarFiltros(): JSX.Element {
        return (
            <tr>
                {
                    this.props.cols.map((col, key) => {
                        return (
                            <td key={key}>
                                <input type="text" id={col.property} name={col.property} onKeyUp={this.filtrar} className="form-control" />
                            </td>
                        )
                    })
                }
            </tr>
        );
    }

    private createActions(row: any) {
        const lista: JSX.Element[] = [];
        if (this.props.actions) {
            this.props.actions.forEach(c => {
                lista.push(<Botao label={c.label} styles={c.styles} handleAction={() => { c.handleAction(row) }} />);
            });
        }
        return lista;
    }

    private popularTabela(): JSX.Element[] {
        const elements: JSX.Element[] = [];
        if (this.props.rows && this.props.cols) {
            this.state.rows.forEach((row: any) => {
                const tr: JSX.Element = (
                    <tr>
                        {
                            this.props.cols.map((col, key) => {
                                if (col.property === 'actions') {
                                    return (
                                        <td key={key}>
                                            {this.createActions(row)}
                                        </td>
                                    );
                                }
                                return <td key={key}>{row[col.property]}</td>
                            })
                        }
                    </tr>
                );
                elements.push(tr);
            });
        }
        else {
            const tr: JSX.Element = (
                <tr>
                    <td colSpan={this.props.cols.length}>Não há registros..</td>
                </tr>
            );
            elements.push(tr);
        }
        return elements;
    }

    public render(): JSX.Element {
        let filter = null;
        if (this.props.filter) {
            filter = this.criarFiltros();
        }
        return (
            <table className={this.props.styles}>
                <thead>
                    {this.carregarColunas()}
                    {filter}
                </thead>
                <tbody>
                    {this.popularTabela()}
                </tbody>
            </table>
        );
    }

    public componentWillReceiveProps(props: ITableProps) {
        this.setState({ rows: props.rows });
        this.setState({ originalList: props.rows });
    }

    private filtrar(event: any): void {
        this.setState({ rows: [...this.state.originalList] });
        const filtro: string = event.target.value;
        if (filtro.trim() !== '') {
            const list = [...this.state.rows].filter(x => x[event.target.name].toString().includes(filtro));
            this.setState({ rows: list });
        } else {
            this.setState({ row: [...this.state.originalList] });
        }
    }

}