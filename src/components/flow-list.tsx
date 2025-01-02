import { Flow } from "@/interfaces/flow.interface";
import { List, ListItem, ListItemButton, ListSubheader } from "@mui/joy";
import { FC } from "react";

export const FlowList: FC<{
  flows: Flow[];
}> = ({ flows }) => {
  return (
    <div>
      <List
        variant="outlined"
        size="sm"
        sx={{ width: 200, borderRadius: "sm" }}
      >
        <ListItem nested>
          <ListSubheader>Active Flows</ListSubheader>
          <List>
            {flows.map((flow) => (
              <ListItem key={flow.id}>
                <ListItemButton component="a" href={`/flow/${flow.id}`}>
                  {flow.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ListItem>
        <ListItem nested>
          <ListSubheader>Archived Flows</ListSubheader>
          <List>
            <ListItem>
              <ListItemButton>Subitem 1</ListItemButton>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </div>
  );
};
