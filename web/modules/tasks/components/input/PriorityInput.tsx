import { SegmentedControl, SegmentedControlProps } from '@mantine/core';

export function PriorityInput(props: Omit<SegmentedControlProps, 'data'>) {
  return (
    <SegmentedControl
      data={[
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ]}
      {...props}
    />
  );
}
