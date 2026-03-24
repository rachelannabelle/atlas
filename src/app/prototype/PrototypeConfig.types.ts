export interface PrototypeMenuItem {
  id: string;
  title: string;
  lastUpdatedLabel: string;
}

export interface PrototypeTopNavMenu {
  items: PrototypeMenuItem[];
  emptyStateEnabled: boolean;
}

export interface PrototypeRoleConfig {
  appName: string;
  roleOptions: string[];
  selectedRole: string;
}

export interface PrototypeBuildingItem {
  id: string;
  label: string;
}

export interface PrototypeTopNavConfig {
  brand: PrototypeRoleConfig;
  buildings: {
    defaultBuildingId: string;
    items: PrototypeBuildingItem[];
  };
  quotationsMenu: PrototypeTopNavMenu;
  reportsMenu: PrototypeTopNavMenu;
  user: {
    name: string;
    email: string;
    avatarAcronym: string;
  };
}

export interface PrototypeScriptMessage {
  role: "user" | "assistant";
  content: string;
}

export interface PrototypeScriptTurn {
  userInput: string;
  assistantResponse: string;
}

export interface PrototypeScriptDefinition {
  scriptId: string;
  messages: PrototypeScriptMessage[];
  turns: PrototypeScriptTurn[];
  fallback: string;
}

export interface PrototypeHistoryItem {
  id: string;
  createdAt: string;
  scriptId: string;
}

export interface PrototypeChatConfig {
  leftNavHistory: {
    items: PrototypeHistoryItem[];
    emptyStateEnabled: boolean;
    helpUrl: string;
  };
  scripts: PrototypeScriptDefinition[];
}

export interface PrototypeFlowEngineConfig {
  events: Array<{ id: string; name: string; description: string }>;
  actions: Array<{ id: string; name: string; description: string }>;
  components: Array<{ id: string; name: string; description: string }>;
}

export interface PrototypeConfig {
  topNav: PrototypeTopNavConfig;
  chat: PrototypeChatConfig;
  flowEngine?: PrototypeFlowEngineConfig;
}

