export const RunStatus = {
  QUEUED: 'queued',
  IN_PROGRESS: 'in_progress',
  REQUIRES_ACTION: 'requires_action',
  CANCELLING: 'cancelling',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
};

export const EndStatus = [
  RunStatus.CANCELLED,
  RunStatus.REQUIRES_ACTION,
  RunStatus.FAILED,
  RunStatus.COMPLETED,
  RunStatus.EXPIRED,
];

export const PendingStatus = [RunStatus.IN_PROGRESS, RunStatus.QUEUED, RunStatus.CANCELLING];
