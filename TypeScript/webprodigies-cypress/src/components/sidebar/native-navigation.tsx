type Props = {
  className?: string;
  getSelectedElement?: (selection: string) => void;
  myWorkspaceId: string;
};

export function NativeNavigation(props: Props) {
  const { className, getSelectedElement, myWorkspaceId } = props;

  return <div>Enter</div>;
}
