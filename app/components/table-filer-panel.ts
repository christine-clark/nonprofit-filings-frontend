import Component from '@glimmer/component';
import Filer from '../models/filer';

interface TableFilerPanelArgs {
  filer: Filer,
  closePanel: any
}

export default class TableFilerPanel extends Component<TableFilerPanelArgs> {
}
