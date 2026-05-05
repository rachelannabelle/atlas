import { useNavigate, useLocation } from "react-router"
import { ChevronsUpDown, Plus, FolderOpen, BookOpen, Network, Building2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useAppContext } from "../context"

type Mode = "scholar" | "operator"

const MODES = [
  {
    id: "scholar" as const,
    label: "Scholar",
    subtitle: "RAG-based knowledge query + quotation generation",
    Icon: BookOpen,
  },
  {
    id: "operator" as const,
    label: "Operator",
    subtitle: "IoT sensor analysis + work order management",
    Icon: Network,
  },
]

const ARTIFACT_CATEGORIES = [
  { value: "sor", label: "SoR", disabled: false },
  { value: "hr-certificates", label: "HR-Certificates", disabled: true },
  { value: "operations", label: "Operations", disabled: true },
  { value: "sop", label: "SOP", disabled: true },
  { value: "sirius", label: "Sirius", disabled: true },
  { value: "hvac", label: "HVAC", disabled: true },
]

const PLACEHOLDER_ANALYSIS_ITEMS = [
  "Tell me about AHU efficiency",
  "Chiller plant energy usage last 30 days",
]

const PLACEHOLDER_WORKFLOW_ITEMS = [
  "Aircon on meeting room 5 leaking",
  "Lift B out of service — fault code E04",
]

function ModeContent({ mode }: { mode: Mode }) {
  const { chats, activeChatId } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const scholarTab = location.pathname.startsWith("/scholar/artifacts")
    ? "artifacts"
    : "chats"
  const operatorTab = location.pathname.startsWith("/operator/workflows")
    ? "workflows"
    : "analysis"

  if (mode === "scholar") {
    return (
      <Tabs
        key="scholar"
        value={scholarTab}
        onValueChange={(v) =>
          navigate(v === "artifacts" ? "/scholar/artifacts" : "/")
        }
        className="w-full"
      >
        <TabsList className="w-full">
          <TabsTrigger value="chats" className="flex-1">Chats</TabsTrigger>
          <TabsTrigger value="artifacts" className="flex-1">Artifacts</TabsTrigger>
        </TabsList>

        <TabsContent value="chats" className="mt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate("/")}
                isActive={location.pathname === "/"}
              >
                <Plus className="size-4 shrink-0" />
                <span>New Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate("/scholar/categories")}
                isActive={location.pathname === "/scholar/categories"}
              >
                <FolderOpen className="size-4 shrink-0" />
                <span>Categories</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {chats.length > 0 && (
            <SidebarGroup className="px-0 pt-2">
              <SidebarGroupLabel>Recent</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        isActive={chat.id === activeChatId}
                        onClick={() => navigate(`/chat/${chat.id}`)}
                      >
                        <span className="truncate">{chat.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </TabsContent>

        <TabsContent value="artifacts" className="mt-2 flex flex-col gap-3">
          <Select defaultValue="sor">
            <SelectTrigger className="w-full" size="sm">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {ARTIFACT_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value} disabled={cat.disabled}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate("/scholar/artifacts")}
                isActive={location.pathname.startsWith("/scholar/artifacts")}
              >
                <span className="truncate">Quotation — Office refurb L3</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <Tabs
      key="operator"
      value={operatorTab}
      onValueChange={(v) =>
        navigate(v === "workflows" ? "/operator/workflows" : "/operator/analysis")
      }
      className="w-full"
    >
      <TabsList className="w-full">
        <TabsTrigger value="analysis" className="flex-1">Analysis</TabsTrigger>
        <TabsTrigger value="workflows" className="flex-1">Workflows</TabsTrigger>
      </TabsList>

      <TabsContent value="analysis" className="mt-2">
        <SidebarMenu>
          {PLACEHOLDER_ANALYSIS_ITEMS.map((title) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                onClick={() => navigate("/operator/analysis")}
                isActive={location.pathname === "/operator/analysis"}
              >
                <span className="truncate">{title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </TabsContent>

      <TabsContent value="workflows" className="mt-2">
        <SidebarMenu>
          {PLACEHOLDER_WORKFLOW_ITEMS.map((title) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                onClick={() => navigate("/operator/workflows")}
                isActive={location.pathname === "/operator/workflows"}
              >
                <span className="truncate">{title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </TabsContent>
    </Tabs>
  )
}

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useSidebar()

  const currentMode: Mode =
    location.pathname.startsWith("/operator") ? "operator" : "scholar"
  const currentModeData = MODES.find((m) => m.id === currentMode)!
  const ModeIcon = currentModeData.Icon

  const setMode = (mode: Mode) => {
    if (mode === "operator") navigate("/operator/analysis")
    else navigate("/")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="pb-0 gap-0">
        {/* HomeDiv — app logo + name + tier, collapses to icon only */}
        <div className="flex items-center gap-1 px-1 pt-1 pb-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 flex-1 min-w-0 px-1 py-1 text-left outline-none focus:outline-none group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <div className="size-7 rounded-md bg-foreground text-background flex items-center justify-center shrink-0">
              <Building2 className="size-4" />
            </div>
            {state === "expanded" && (
              <div className="flex flex-col min-w-0 leading-tight">
                <span className="text-sm font-semibold truncate">AiBE</span>
                <span className="text-xs text-muted-foreground truncate capitalize">
                  {currentModeData.label}
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Mode switcher */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
                  tooltip={currentModeData.label}
                >
                  <ModeIcon className="size-4 shrink-0" />
                  <span className="flex-1 min-w-0 text-left text-sm font-semibold truncate">
                    {currentModeData.label}
                  </span>
                  <ChevronsUpDown className="size-4 shrink-0 ml-1" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
              >
                {MODES.map((m) => (
                  <DropdownMenuItem
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className="gap-2 p-2"
                  >
                    <m.Icon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{m.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {m.subtitle}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-2">
        {state === "expanded" && <ModeContent mode={currentMode} />}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" tooltip="Account">
                  <Avatar className="size-8 rounded-lg shrink-0">
                    <AvatarFallback className="rounded-lg text-xs">R</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Rachel</span>
                    <span className="truncate text-xs text-muted-foreground">
                      design@rachelc.cx
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 rounded-lg"
              >
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
