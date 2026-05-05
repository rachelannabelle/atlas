import { createHashRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ChatPage } from './pages/ChatPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { SearchPage } from './pages/SearchPage';
import { QuotationPage } from './pages/QuotationPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { StorybookLayout } from './pages/storybook/StorybookLayout';
import { OverviewPage } from './pages/storybook/OverviewPage';
import { ColorsPage } from './pages/storybook/ColorsPage';
import { TypographyPage } from './pages/storybook/TypographyPage';
import { LeftNavPage } from './pages/storybook/LeftNavPage';
import { NavChipsPage } from './pages/storybook/NavChipsPage';
import { ChatBoxPage } from './pages/storybook/ChatBoxPage';
import { ChainOfThoughtPage } from './pages/storybook/ChainOfThoughtPage';
import { ExcavationListPage } from './pages/storybook/ExcavationListPage';
import { SheetFormPage } from './pages/storybook/SheetFormPage';
import { ButtonsPage } from './pages/storybook/ButtonsPage';
import { InputsPage } from './pages/storybook/InputsPage';
import { DropdownsPage } from './pages/storybook/DropdownsPage';
import { AvatarsPage } from './pages/storybook/AvatarsPage';
import { TooltipsPage } from './pages/storybook/TooltipsPage';

export const router = createHashRouter([
  {
    path: '/storybook',
    Component: StorybookLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: 'colors', Component: ColorsPage },
      { path: 'typography', Component: TypographyPage },
      { path: 'left-nav', Component: LeftNavPage },
      { path: 'nav-chips', Component: NavChipsPage },
      { path: 'chatbox', Component: ChatBoxPage },
      { path: 'chain-of-thought', Component: ChainOfThoughtPage },
      { path: 'excavation-list', Component: ExcavationListPage },
      { path: 'sheet-form', Component: SheetFormPage },
      { path: 'buttons', Component: ButtonsPage },
      { path: 'inputs', Component: InputsPage },
      { path: 'dropdowns', Component: DropdownsPage },
      { path: 'avatars', Component: AvatarsPage },
      { path: 'tooltips', Component: TooltipsPage },
    ],
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      // Chat routes
      { index: true, Component: ChatPage },
      { path: 'chat/:chatId', Component: ChatPage },

      // Module routes
      { path: 'modules/:moduleId', Component: ChatPage },
      { path: 'modules/:moduleId/chat/:chatId', Component: ChatPage },

      // Other views
      { path: 'documents', Component: DocumentsPage },
      { path: 'search', Component: SearchPage },
      { path: 'quotations', Component: QuotationPage },

      // Scholar placeholders
      { path: 'scholar/categories', Component: PlaceholderPage },
      { path: 'scholar/artifacts', Component: PlaceholderPage },

      // Operator placeholders
      { path: 'operator/analysis', Component: PlaceholderPage },
      { path: 'operator/workflows', Component: PlaceholderPage },

      // Catch-all
      { path: '*', Component: ChatPage },
    ],
  },
]);
