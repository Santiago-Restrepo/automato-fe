import { FlowIntegrationSecret } from "./flow-integration-secret.interface";

export interface FlowIntegration {
  readonly id: number;
  integrationId: number;
  flowId: string;
  secrets: FlowIntegrationSecret[];
  integrationName?: string;
}
