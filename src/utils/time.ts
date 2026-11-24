// Browser-bundled time zone data still places Morocco at UTC+1, while the
// operating system (the clock users actually see) has it at UTC.
const ZONE_OVERRIDES: Record<string, string> = {
  'Africa/Casablanca': 'UTC',
  'Africa/El_Aaiun': 'UTC',
};

const resolveZone = (timeZone?: string) => {
  const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  return ZONE_OVERRIDES[zone] ?? zone;
};

export const formatClock = (date: Date = new Date(), timeZone?: string) =>
  new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: resolveZone(timeZone) }).format(date);

export const getHour = (date: Date = new Date(), timeZone?: string) =>
  Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: resolveZone(timeZone) }).format(date)
  );
