export interface TreeNode<T> {
    data: T;
    children?: TreeNode<T>[];
    expanded?: boolean;
}
  
export interface FSEntry {
    name: string;
    size: string;
    kind: string;
    items?: number;
    childEntries?: FSEntry[];
    expanded?: boolean;
  }