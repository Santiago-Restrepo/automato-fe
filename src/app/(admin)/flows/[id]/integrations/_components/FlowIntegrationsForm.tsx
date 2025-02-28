"use client";
import { useFlowIntegrationStore } from "@/hooks/use-flow-integration-store";
import { FlowIntegrationSecret } from "@/interfaces/flow-integration-secret.interface";
import { FlowIntegration } from "@/interfaces/flow-integration.interface";
import { Integration } from "@/interfaces/integration.interface";
import {
  addToast,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { FC, useEffect, useMemo } from "react";
import { saveFlowIntegration } from "../_actions/saveFlowIntegration";
import { redirect } from "next/navigation";

export const FlowIntegrationsForm: FC<{
  flowId: string;
  defaultFlowIntegrations: FlowIntegration[];
  integrations: Integration[];
}> = ({ flowId, defaultFlowIntegrations, integrations }) => {
  const {
    flowIntegrations,
    setFlowIntegrations,
    updateFlowIntegration,
    addFlowIntegrationSecret,
    updateFlowIntegrationSecret,
  } = useFlowIntegrationStore((s) => s);

  const items = useMemo(() => {
    return integrations.map((integration) => ({
      label: integration.name,
      id: integration.id,
    }));
  }, [integrations]);

  const onUpdateFlowIntegration = (flowIntegration: FlowIntegration) => {
    updateFlowIntegration(flowIntegration);
  };

  const onAddIntegrationSecret = (integrationId: number) => {
    addFlowIntegrationSecret(integrationId);
  };

  const onChangeIntegrationSecretValue = (
    newFlowIntegrationSecret: Partial<FlowIntegrationSecret>
  ) => {
    updateFlowIntegrationSecret(newFlowIntegrationSecret);
  };
  const onSaveFlowIntegration = async (flowIntegrationId: number) => {
    const flowIntegration = flowIntegrations.find(
      (flowIntegration) => flowIntegration.id === flowIntegrationId
    );
    if (!flowIntegration) return;
    const response = await saveFlowIntegration(flowIntegration);
    if (response.status === 200) {
      addToast({
        title: "Flow Integration saved",
        color: "success",
      });
      redirect(`/flows/${flowId}/integrations`);
    } else {
      addToast({
        title: "Error saving flow integration",
        color: "danger",
      });
    }
  };
  useEffect(() => {
    setFlowIntegrations(defaultFlowIntegrations);
  }, [defaultFlowIntegrations]);
  return (
    <Card
      className="w-full max-w-5xl p-2 mt-10 mx-auto border-1.5 border-gray-200"
      shadow="none"
    >
      <CardHeader className="flex justify-between">
        <h1 className="font-semibold text-xl">Integrations</h1>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {flowIntegrations.map((flowIntegration) => (
            <Card className="w-1/2 max-w-md p-3" key={flowIntegration.id}>
              <CardHeader className="flex gap-4 justify-between">
                <Autocomplete
                  items={items}
                  selectedKey={flowIntegration.integrationId.toString()}
                  onSelectionChange={(id) => {
                    const integration = integrations.find(
                      (integration) => integration.id === Number(id)
                    );
                    if (integration) {
                      onUpdateFlowIntegration({
                        ...flowIntegration,
                        integrationId: integration.id,
                        integrationName: integration.name,
                      });
                    }
                  }}
                >
                  {items.map((item) => (
                    <AutocompleteItem key={item.id}>
                      {item.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Button
                  color="secondary"
                  onPress={() => onSaveFlowIntegration(flowIntegration.id)}
                >
                  Save
                </Button>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    {flowIntegration.secrets.map((secret) => (
                      <div key={secret.id}>
                        <div className="flex gap-2">
                          <Input
                            label="Key"
                            placeholder="Enter Key"
                            value={secret.key}
                            onChange={(e) =>
                              onChangeIntegrationSecretValue({
                                id: secret.id,
                                flowIntegrationId: flowIntegration.id,
                                key: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Secret"
                            placeholder="Enter secret"
                            value={secret.value}
                            onChange={(e) =>
                              onChangeIntegrationSecretValue({
                                id: secret.id,
                                flowIntegrationId: flowIntegration.id,
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Divider className="my-2" />
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => onAddIntegrationSecret(flowIntegration.id)}
                >
                  + Add Secret
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
