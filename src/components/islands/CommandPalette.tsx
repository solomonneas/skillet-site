import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Entry = {
  title: string;
  url: string;
  group: "Sections" | "Compare";
};

const GROUP_ORDER: Entry["group"][] = ["Sections", "Compare"];

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [entries, setEntries] = React.useState<Entry[] | null>(null);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    const trigger = document.getElementById("cmdkTrigger");
    const onClick = () => setOpen(true);
    document.addEventListener("keydown", down);
    trigger?.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", down);
      trigger?.removeEventListener("click", onClick);
    };
  }, []);

  React.useEffect(() => {
    if (!open || entries !== null) return;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: Entry[]) => setEntries(data))
      .catch(() => setEntries([]));
  }, [open, entries]);

  const groups = GROUP_ORDER.map((group) => ({
    group,
    items: (entries ?? []).filter((entry) => entry.group === group),
  })).filter((group) => group.items.length > 0);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="border border-border bg-popover p-0 text-popover-foreground shadow-none"
      title="Search Skillet"
      description="Search Skillet pages."
    >
      <CommandInput placeholder="Search Skillet..." />
      <CommandList className="max-h-[min(28rem,70vh)]">
        <CommandEmpty>
          {entries === null ? "Loading..." : "No results."}
        </CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem
                key={item.url}
                value={`${item.title} ${item.url}`}
                onSelect={() => {
                  setOpen(false);
                  window.location.assign(item.url);
                }}
              >
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
