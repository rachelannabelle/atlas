import { useNavigate } from "react-router";
import {
  Palette,
  Type,
  LayoutGrid,
  MessageSquare,
  Navigation2,
  PanelLeft,
  FileText,
  User,
  Info,
  ChevronDown,
  ListChecks,
  SlidersHorizontal,
  FormInput,
} from "lucide-react";

const sections = [
  { path: "colors", label: "Colors", icon: Palette, desc: "Design tokens, brand palette, CSS custom properties" },
  { path: "typography", label: "Typography", icon: Type, desc: "Heading levels, body text, font weights, app-specific text classes" },
  { path: "left-nav", label: "Left-Hand Nav", icon: PanelLeft, desc: "Sidebar with modules, chats, user profile footer" },
  { path: "nav-chips", label: "Nav Chips", icon: Navigation2, desc: "Top bar Building/Scholar dropdowns, filter chips" },
  { path: "chatbox", label: "Chat Box", icon: MessageSquare, desc: "Input box, prompt cards, message bubbles, file attachment" },
  { path: "chain-of-thought", label: "Chain of Thought", icon: ListChecks, desc: "Animated AI reasoning steps with shimmer effect" },
  { path: "excavation-list", label: "Excavation Schedule List", icon: FileText, desc: "Selectable schedule items with rate display" },
  { path: "sheet-form", label: "Right-Hand Sheet Form", icon: SlidersHorizontal, desc: "Quotation slide-over panel with collapsible sections" },
  { path: "buttons", label: "Buttons", icon: LayoutGrid, desc: "All CVA variants, sizes, icon patterns, states" },
  { path: "inputs", label: "Input Fields", icon: FormInput, desc: "Text inputs, textarea, checkbox, switch, select" },
  { path: "dropdowns", label: "Dropdown Menus", icon: ChevronDown, desc: "User profile menu, chat kebab, terms actions" },
  { path: "avatars", label: "Avatars", icon: User, desc: "SVG circle avatars with initials at all sizes" },
  { path: "tooltips", label: "Tooltips", icon: Info, desc: "Dark-styled tooltips with directional positioning" },
];

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl mb-2">AiBE Component Storybook</h1>
        <p className="text-muted-foreground mb-4">
          Developer reference for all UI components used in the AiBE Operator
          app. Each page includes a live preview, CSS classes/tokens, and code
          snippets for production replication.
        </p>
        <div className="bg-[#EBEBFC]/50 border border-[#3C3DEC]/20 rounded-xl p-4 text-sm">
          <p className="font-medium text-[#3C3DEC] mb-1">Tech Stack</p>
          <p className="text-muted-foreground">
            React 18 &middot; Tailwind CSS v4 &middot; shadcn/ui (Radix
            primitives) &middot; Lucide React icons &middot; CSS custom
            properties in{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              /src/styles/theme.css
            </code>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.path}
              onClick={() => navigate(`/storybook/${s.path}`)}
              className="flex items-start gap-3 p-4 rounded-xl border hover:border-[#3C3DEC]/30 hover:bg-[#EBEBFC]/20 transition-colors text-left group"
            >
              <div className="bg-[#EBEBFC] p-2 rounded-lg shrink-0 group-hover:bg-[#EBEBFC]">
                <Icon className="size-4 text-[#3C3DEC]" />
              </div>
              <div>
                <p className="text-sm mb-0.5">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-muted/30 rounded-xl p-6 border">
        <h3 className="text-sm mb-3">Production Notes</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>
            <strong>CSS Framework:</strong> Tailwind CSS v4 with custom
            properties in{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              /src/styles/theme.css
            </code>
          </li>
          <li>
            <strong>Component Library:</strong> shadcn/ui (Radix UI primitives +
            CVA variants)
          </li>
          <li>
            <strong>Icons:</strong> lucide-react at size-4 (16px) unless noted
          </li>
          <li>
            <strong>Primary Brand Color:</strong> #3C3DEC with hover #2d2eb8 and
            tint #EBEBFC
          </li>
          <li>
            <strong>Border Radius:</strong> --radius: 0.625rem (10px).
            sm/md/lg/xl computed from this.
          </li>
          <li>
            <strong>Routing:</strong> React Router v7 data mode
            (createBrowserRouter)
          </li>
          <li>
            <strong>Dark Mode:</strong> CSS class strategy (.dark on root),
            custom variant via @custom-variant
          </li>
        </ul>
      </div>
    </div>
  );
}
