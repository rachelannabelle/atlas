import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { ChevronsUpDown, Plus, MessageSquare, FolderOpen } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "./ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
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
  },
  {
    id: "operator" as const,
    label: "Operator",
    subtitle: "IoT sensor analysis + work order management",
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

export function AppSidebar() {
  const [mode, setMode] = useState<Mode>("scholar")
  const { chats, activeChatId } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const currentMode = MODES.find((m) => m.id === mode)!

  return (
    <Sidebar collapsible="none" className="w-64 border-r flex-shrink-0">
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex flex-col flex-1 min-w-0 text-left leading-tight">
                    <span className="text-sm font-semibold truncate">
                      {currentMode.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {currentMode.subtitle}
                    </span>
                  </div>
                  <ChevronsUpDown className="size-4 shrink-0 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                {MODES.map((m) => (
                  <DropdownMenuItem
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className="flex-col items-start gap-0 p-2"
                  >
                    <span className="font-medium text-sm">{m.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {m.subtitle}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2 pt-2">
        {mode === "scholar" ? (
          <Tabs defaultValue="chats" className="w-full">
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
                    <Plus className="size-4" />
                    <span>New Chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate("/scholar/categories")}
                    isActive={location.pathname === "/scholar/categories"}
                  >
                    <FolderOpen className="size-4" />
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
                            className="truncate"
                          >
                            <MessageSquare className="size-4 shrink-0" />
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
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      disabled={cat.disabled}
                    >
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
                    <MessageSquare className="size-4 shrink-0" />
                    <span className="truncate">Quotation — Office refurb L3</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="analysis" className="w-full">
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
                      <MessageSquare className="size-4 shrink-0" />
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
                      <MessageSquare className="size-4 shrink-0" />
                      <span className="truncate">{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </TabsContent>
          </Tabs>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
