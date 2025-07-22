import { randomUUID } from "node:crypto";
import { Status } from "./Status";

export interface OrderProps {
  id?: string;
  status: Status;
  value: number;
  customerName: string;
  customerEmail: string;
  createdAt?: Date | null;
}

export class Order {
  constructor(
    private props: OrderProps,
    id?: string
  ) {
    this.props = {
      ...props,
      id: id ?? randomUUID(),
    };
  }

  get id() {
    return this.props.id;
  }

  get status() {
    return this.props.status;
  }
  get value() {
    return this.props.value;
  }
  get customerName() {
    return this.props.customerName;
  }
  get customerEmail() {
    return this.props.customerEmail;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  set status(newStatus: Status) {
    this.props.status = newStatus;
  }
}
