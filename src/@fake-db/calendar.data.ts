export class CalendarFakeData {
  public static events = [
    {
      id: 1,
      url: '',
      title: 'covid 19',
      start: new Date(),
      end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      allDay: false,
      calendar: 'Santé',
      extendedProps: {}
    },
    {
      id: 2,
      url: '',
      title: 'Meeting With Client',
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -11),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -10),
      allDay: true,
      calendar: 'Management',
      extendedProps: {}
    },
    {
      id: 3,
      url: '',
      title: 'Soutnance pfe',
      allDay: true,
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -9),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -7),
      calendar: 'Ingénierie',
      extendedProps: {}
    },
    {
      id: 4,
      url: 'https://www.pixinvent.com',
      title: 'URL event',
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -11),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -10),
      allDay: true,
      calendar: 'Management',
      extendedProps: {}
    },
    {
      id: 5,
      url: '',
      title: 'match info 3 vs info 5',
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -13),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -12),
      allDay: true,
      calendar: 'Sport',
      extendedProps: {
        location: 'Moscow',
        description: 'The party club'
      }
    },
    {
      id: 6,
      url: '',
      title: 'meeting for upm community project',
      start: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -13),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, -12),
      allDay: true,
      calendar: 'Ingénierie',
      extendedProps: {
        location: 'Japan',
        description: 'weekend Drive'
      }
    },
    {
      id: 7,
      url: '',
      title: 'Info 3 ratrappages',
      start:
        new Date().getMonth() === 11
          ? new Date(new Date().getFullYear() + 1, 0, 1)
          : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      end:
        new Date().getMonth() === 11
          ? new Date(new Date().getFullYear() + 1, 0, 1)
          : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      allDay: true,
      calendar: 'Ingénierie',
      extendedProps: {}
    }
  ];
  public static calendar = [
    { id: 1, filter: 'Hôtellerie', color: 'primary', checked: true },
    { id: 2, filter: 'Management', color: 'success', checked: true },
    { id: 3, filter: 'Ingénierie', color: 'danger', checked: true },
    { id: 4, filter: 'Santé', color: 'warning', checked: true },
    { id: 5, filter: 'Sport', color: 'info', checked: true }
  ];
}
