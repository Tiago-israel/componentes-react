import * as React from 'react';
import { ITableProps } from './interfaces/ITableProps';


export default class Table extends React.Component<ITableProps, any> {

    public constructor(props: ITableProps) {
        super(props);
    }

    public carregarColunas(): JSX.Element {
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

    public popularTabela() {
        const elements: JSX.Element[] = [];
        if (this.props.rows && this.props.cols) {
            this.props.rows.forEach(row => {
                const tr: JSX.Element = (
                    <tr>
                        {
                            this.props.cols.map((col, key) => {
                                return <td>{row[col.property]}</td>
                            })
                        }
                    </tr>
                );
                elements.push(tr);
            });
        } else {
            const tr: JSX.Element = (
                <tr>
                    <td>Não há registros..</td>
                </tr>
            );
            elements.push(tr);
        }
        return elements;
    }

    public render(): JSX.Element {
        return (
            <table className={this.props.styles}>
                <thead>
                    {this.carregarColunas()}
                </thead>
                <tbody>
                    {this.popularTabela()}
                </tbody>
            </table>
        );
    }

}