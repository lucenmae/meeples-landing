import { useAdmin } from '@/hooks/useAdmin';

export function AdminOnlyComponent() {
  const { isAdmin, isLoading } = useAdmin();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this content.</div>;
  }

  return <div>Admin-only content here</div>;
}