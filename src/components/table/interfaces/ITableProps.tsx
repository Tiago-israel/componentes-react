import { Col } from '../models/col';

export interface ITableProps {
    cols: Col[];
    rows: any[];
    styles: string;
    filter?: boolean;
    actions?: Array<any>;
}

