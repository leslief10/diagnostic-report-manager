import { Badge } from './Badge';

export function ReportBadge({ type }: { type: 'Vibration' | 'Thermal' }) {
  return <Badge variant={type === 'Vibration' ? 'vibration' : 'thermal'}>{type}</Badge>;
}
