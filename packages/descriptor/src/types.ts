export type OwlAction =
    | { type: "submit"; id: string; label: string }
    | { type: "navigate"; id: string; label: string; to: string };

export type OwlFormField =
    | { kind: "text"; id: string; label: string; required?: boolean; placeholder?: string }
    | { kind: "select"; id: string; label: string; options: { label: string; value: string }[] }
    | { kind: "number"; id: string; label: string; min?: number; max?: number };

export type OwlCard = {
    type: "card";
    id: string;
    title: string;
    body?: string;
    actions?: OwlAction[];
};

export type OwlForm = {
    type: "form";
    id: string;
    title: string;
    fields: OwlFormField[];
    actions: Extract<OwlAction, { type: "submit" }>[]; // submit only
};

export type OwlList = {
    type: "list";
    id: string;
    title?: string;
    columns: string[];
    rows: Record<string, unknown>[];
    actions?: OwlAction[];
};

export type OwlDescriptor = {
    $schema?: string;
    version: "0.1";
    widget: OwlCard | OwlForm | OwlList;
    correlationId?: string;
};
