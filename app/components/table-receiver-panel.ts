import Component from '@glimmer/component';
import Receiver from '../models/receiver';

interface TableReceiverPanelArgs {
  receiver: Receiver,
  closePanel: any
}

export default class TableReceiverPanel extends Component<TableReceiverPanelArgs> {
}
