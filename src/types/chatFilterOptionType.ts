export type value = 'latest' | 'unread';

export interface ChatFilterOption {
  label: string;
  value: value;
}

export interface FilterState {
  options: ChatFilterOption[];
  selected: ChatFilterOption;
  onChange: (value: ChatFilterOption) => void;
}
