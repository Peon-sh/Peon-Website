import type { DocPage } from './types';
import { publicEnv } from '@/lib/env';

const MCP_URL = `${publicEnv.appUrl}/mcp`;

export const AI_PAGES: DocPage[] = [
  {
    slug: 'mcp',
    title: 'MCP Server',
    description:
      'Connect Cursor, Claude, and other agents to Peon’s hosted Model Context Protocol endpoint — same RBAC as the dashboard.',
    sections: [
      {
        h: 'What Peon MCP is',
        p: [
          'Peon exposes a hosted Streamable HTTP MCP server at your app origin. Authenticate with a personal API token (peon_…). Agents get the same operational tools as the REST API and the in-app Chat assistant — projects, services, deployments, env, backups, servers, sources, members, and more — under your workspace role and project memberships.',
          'This is a first-class product surface: not a side script. Shell exec tools are intentionally omitted; use the UI Terminal tabs for interactive shells.',
        ],
      },
      {
        h: '1. Create an API token',
        p: [
          'In the Peon app: Sidebar → Keys & Tokens → API Tokens. Create a token, copy the peon_… value once (it is not shown again). The token is scoped to the current workspace and inherits your role — OWNER/ADMIN for infrastructure; project MEMBER only reaches projects they belong to.',
        ],
      },
      {
        h: '2. MCP client JSON (Cursor / Claude)',
        p: [
          'Add a server entry to your MCP client config (for example Cursor Settings → MCP, or Claude Desktop mcpServers). Use streamable HTTP with a Bearer header:',
        ],
        code: `{
  "mcpServers": {
    "peon": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer peon_xxxxxxxx"
      }
    }
  }
}`,
        codeLang: 'json',
      },
      {
        h: '3. Replace placeholders',
        p: [],
        list: [
          `url — ${MCP_URL} on Peon Cloud, or https://your-self-host-domain/mcp when self-hosting`,
          'Authorization — Bearer plus your real peon_… token (never commit tokens to Git)',
          'Restart or reload the MCP client after saving config',
        ],
      },
      {
        h: 'What agents can do',
        p: ['Tool catalog (names match the hosted server):'],
        list: [
          'Workspace & projects — get_context, get/update_workspace, list/create/update/delete_project, members & invitations',
          'Servers — list/get/create/update/delete_server, validate, cleanup, logs, destinations',
          'Services — list/get/create/update/delete_service, config, status, deploy, control, rollback, logs',
          'Env & volumes — list/set/delete/bulk_set_env, import_preview_env, list/create/delete_volume',
          'Deployments & previews — list/get/cancel_deployment, list/delete_preview',
          'Tasks & backups — scheduled tasks, executions, backup schedules, restore',
          'Sources & templates — Git sources, GitHub repos/branches, marketplace templates',
          'Infra extras — private keys, storages, tags, shared variables, notifications, webhooks',
        ],
      },
      {
        h: 'Resources',
        p: [
          'MCP resources such as peon://workspace, peon://projects, and peon://servers expose read-oriented context for clients that support resources.',
        ],
      },
      {
        h: 'Security notes',
        p: [],
        list: [
          'Treat peon_ tokens like passwords — rotate by revoking and creating a new token',
          'API and MCP enforce RBAC; the UI alone is not the security boundary',
          'exec_in_service and exec_on_server are not registered on MCP — use Terminal in the app',
          'Prefer a least-privilege member token when giving an agent access to one project only',
        ],
      },
      {
        h: 'Related',
        p: [
          'In-app Chat uses the same tool catalog with human approval for mutations — see Chat Assistant. Token management lives under Keys & Tokens.',
        ],
      },
    ],
  },
  {
    slug: 'chat-assistant',
    title: 'Chat Assistant',
    description:
      'Peon Chat: BYO LLM keys, streaming threads, user-manual lookup, visuals, and Approve cards for mutating tools.',
    sections: [
      {
        h: 'Highlight: AI that operates Peon under your rules',
        p: [
          'Peon Chat is the in-app AI assistant in the sidebar (Overview → Chat). It is not a generic chatbot bolted onto docs — it runs the same MCP-derived tool catalog as external agents, with your workspace LLM keys, your RBAC, and an Approve step before anything mutates production.',
          'Ask it to deploy, inspect logs, explain how a setting works, or chart deployment outcomes. It answers with the product in the loop.',
        ],
      },
      {
        h: 'Prerequisites — Settings → LLMs',
        p: [
          'Workspace OWNER or ADMIN adds OpenAI and/or Anthropic API keys under Settings → LLMs. Keys are stored encrypted. Without keys, Chat shows a gate linking to that page. After keys save, the Chat header model picker lists models from that provider.',
        ],
      },
      {
        h: 'Where and UI',
        p: ['Path: /chat.'],
        list: [
          'Thread rail — create, select, and delete conversation threads',
          'Model picker — choose a model from your configured providers',
          'Streaming replies — tokens appear as the model responds',
          'Empty-state prompts — example questions to start from',
          'Approval card — appears when a mutating tool needs your OK',
        ],
      },
      {
        h: 'Core capabilities',
        p: [],
        list: [
          'Operate Peon — list/get projects and services, trigger deploys and rollbacks, read status and logs, manage env (within role), and more — same surface as MCP',
          'How-to answers — for “how do I…” and UI navigation, Chat calls lookup_user_manual and bases steps on the official user manual (no invented menu paths)',
          'Visuals — present_visual can render charts, metric cards, status lists, and timelines (e.g. successful vs failed deploys by day) instead of ASCII tables',
          'Human-in-the-loop — mutating tools request Approve / Deny in the UI; nothing destructive runs silently',
          'RBAC-aware — cannot bypass roles, invent secrets, or escalate past your memberships',
        ],
      },
      {
        h: 'What Chat will not do',
        p: [],
        list: [
          'No interactive shell in containers or hosts (use Service → Terminal or Servers → Terminal)',
          'No inventing secrets or revealing values you are not allowed to see',
          'No bypassing project MEMBER read-only limits',
          'No substituting for CI policy — treat Chat as an operator under the same rules as you',
        ],
      },
      {
        h: 'Example prompts',
        p: [],
        list: [
          '“How do I add a custom domain with HTTPS?”',
          '“List failed deployments on project X this week and summarize the logs.”',
          '“Propose a rollback to the last healthy production deploy — wait for my approval.”',
          '“Show a chart of successful vs failed deployments by day.”',
          '“What role do I need to invite someone to one project only?”',
        ],
      },
      {
        h: 'Chat vs MCP vs Terminal',
        p: [],
        list: [
          'Chat — best inside the Peon UI; streaming, manual lookup, visuals, Approve cards; needs workspace LLM keys',
          'MCP — best in Cursor / Claude Desktop with a peon_ token; same ops tools; no Chat-only tools (lookup_user_manual, present_visual)',
          'Terminal — only place for interactive shells; not exposed to Chat or MCP',
        ],
      },
      {
        h: 'Troubleshooting',
        p: [],
        list: [
          'No models — add OpenAI or Anthropic under Settings → LLMs, then pick a model in Chat',
          'Tool denied — your role cannot perform that action; ask an OWNER/ADMIN or project ADMIN',
          'Stuck pending Approve — check the approval card in the thread; Deny cancels the mutation',
        ],
      },
    ],
  },
];
