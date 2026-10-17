export type CityId = "paris" | "london" | "lisbon" | "brazil";

export type LinkKind = "maps" | "site" | "tickets";

export type TripLink = {
  kind: LinkKind;
  href: string;
  label?: string;
};

export type Stop = {
  time: string;
  title: string;
  text?: string;
  bullets?: string[];
  note?: string;
  optional?: boolean;
  links?: TripLink[];
};

export type Day = {
  id: string;
  date: string;
  dayNumber: number;
  weekday: string;
  cities: CityId[];
  title: string;
  goal?: string;
  stops: Stop[];
  tip?: string;
};

export type ChecklistGroup = {
  title: string;
  items: string[];
};

export type City = {
  id: Exclude<CityId, "brazil">;
  name: string;
  localName: string;
  flag: string;
  tagline: string;
  period: string;
  address: string;
  addressShort: string;
  intro: string;
  dayIds: string[];
  highlights: { name: string; when: string; detail: string; href: string }[];
  highlightsTitle: string;
  checklist: ChecklistGroup[];
  closingNotes: string[];
};

export type Leg = {
  id: string;
  date: string;
  mode: "flight" | "train";
  from: { code: string; place: string; time: string };
  to: { code: string; place: string; time: string };
  carrier: string;
  details: string[];
  cities: [CityId, CityId];
};

export const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const directions = (origin: string, destination: string, mode: "transit" | "driving" = "transit") =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;

export const trip = {
  title: "Eurotrip de Natal",
  year: 2026,
  period: "18 a 31 de dezembro de 2026",
  travelers: ["Gustavo Lima", "Mylena Lima", "Paloma Ribeiro"],
  departureISO: "2026-12-18T20:40:00-03:00",
  route: ["GRU", "CDG", "STP", "LIS", "CDG", "GRU"],
};

const PARIS_HOTEL = "28bis Avenue Corentin Cariou, 75019 Paris, França";
const LONDON_HOTEL = "57 Cricklewood Broadway, London NW2 3JX, Reino Unido";
const LISBON_HOTEL = "Rua Pinheiro Chagas 37, 1050-175 Lisboa, Portugal";

export const cities: City[] = [
  {
    id: "paris",
    name: "Paris",
    localName: "Paris",
    flag: "🇫🇷",
    tagline: "Natal encantado 🎄",
    period: "19 a 24/12",
    address: "28bis Avenue Corentin Cariou, 19º arrondissement, 75019 Paris, França",
    addressShort: "28bis Av. Corentin Cariou · 19º",
    intro:
      "Cinco dias de Paris vestida para o Natal: Torre Eiffel iluminada, o castelo da Disney, o Louvre, Versalhes inteiro e um último dia corrido entre Montmartre, Champs-Élysées e Primark.",
    dayIds: ["2026-12-18", "2026-12-19", "2026-12-20", "2026-12-21", "2026-12-22", "2026-12-23"],
    highlightsTitle: "Pubs para fechar a noite",
    highlights: [
      {
        name: "The Green Linnet",
        when: "Seg, 21/12",
        detail: "Pub irlandês perto de Châtelet, depois do centro histórico.",
        href: maps("The Green Linnet, 8 Avenue Victoria, 75004 Paris"),
      },
      {
        name: "The Bowler",
        when: "Qua, 23/12",
        detail: "Pub inglês perto da Champs-Élysées. Última bebida, volta cedo.",
        href: maps("The Bowler pub, 13 Rue d'Artois, 75008 Paris"),
      },
    ],
    checklist: [
      {
        title: "Ingressos e atrações",
        items: [
          "Comprar ingressos do Louvre com horário marcado",
          "Comprar ingressos da Disneyland Paris (Disneyland Park)",
          "Reservar Versalhes: palácio + domínio do Trianon",
          "Ver se precisa de ingresso antecipado para o Arco do Triunfo",
          "Conferir regras de entrada e reservas da Notre-Dame",
        ],
      },
      {
        title: "Natal e compras",
        items: [
          "Confirmar funcionamento do mercado de Natal das Tuileries",
          "Confirmar a feira de Natal da Champs-Élysées",
          "Ver a decoração de 2026 das Galeries Lafayette",
          "Confirmar endereço, horário e trajeto até a Primark do Qwartz",
        ],
      },
      {
        title: "Transporte e hospedagem",
        items: [
          "Planejar rotas de metrô e RER a partir do hotel",
          "Confirmar check-in e regras de saída do hotel",
          "Reservar táxi para a madrugada de 24/12 (Gare du Nord)",
          "Deixar malas e documentos prontos na noite de 23/12",
        ],
      },
    ],
    closingNotes: [
      "Disney e Versalhes ocupam o dia inteiro: nada de pub nessas noites.",
      "O dia 23 é o mais corrido. Se atrasar, encurte Arco do Triunfo ou Champs-Élysées para garantir a Primark.",
      "Horários de inverno, feiras e decorações de 2026 devem ser confirmados nos sites oficiais.",
    ],
  },
  {
    id: "london",
    name: "Londres",
    localName: "London",
    flag: "🇬🇧",
    tagline: "Pré-réveillon 🤩",
    period: "24 a 27/12",
    address: "57 Cricklewood Broadway, Londres, NW2 3JX, Reino Unido",
    addressShort: "57 Cricklewood Broadway · NW2",
    intro:
      "Três dias de Londres no auge das festas. Véspera de Natal entre mercados, Natal a pé por Westminster (sem metrô!) e Boxing Day em Notting Hill e Covent Garden.",
    dayIds: ["2026-12-24", "2026-12-25", "2026-12-26"],
    highlightsTitle: "Mercados de Natal no caminho",
    highlights: [
      {
        name: "Borough Market",
        when: "Qui, 24/12",
        detail: "Gastronomia. Na véspera fecha às 15h.",
        href: "https://boroughmarket.org.uk/",
      },
      {
        name: "Southbank Winter Market",
        when: "Qui, 24/12",
        detail: "Barraquinhas à beira do Tâmisa, ao lado da London Eye.",
        href: "https://www.southbankcentre.co.uk/",
      },
      {
        name: "Covent Garden",
        when: "Sáb, 26/12",
        detail: "Mercado coberto e a árvore de Natal mais fotogênica.",
        href: "https://www.coventgarden.london/",
      },
      {
        name: "Hyde Park Winter Wonderland",
        when: "Sáb, 26/12 · opcional",
        detail: "Parque de diversões, patinação e feira. Exige ingresso.",
        href: "https://hydeparkwinterwonderland.com/",
      },
    ],
    checklist: [
      {
        title: "Entrada no Reino Unido",
        items: [
          "Solicitar a ETA (autorização eletrônica) do Reino Unido para os três",
          "Confirmar horário do Eurostar e chegar 90 min antes na Gare du Nord",
        ],
      },
      {
        title: "Reservas e ingressos",
        items: [
          "Organizar guarda-volumes ou deixar malas na hospedagem no dia 24",
          "Confirmar horário do Borough Market em 24/12",
          "Reservar o almoço de Natal (25/12)",
          "Ver funcionamento de Portobello Road no Boxing Day",
          "Decidir sobre o Winter Wonderland e comprar ingresso",
        ],
      },
      {
        title: "Transporte",
        items: [
          "Planejar trajeto St Pancras → Cricklewood",
          "Reservar táxi/aplicativo para ir e voltar no dia 25 (sem metrô)",
          "Confirmar aeroporto de saída e reservar táxi para a madrugada de 27/12",
        ],
      },
    ],
    closingNotes: [
      "25/12 não tem metrô nem ônibus. Planeje táxi ou aplicativo nos dois sentidos.",
      "British Museum e Natural History Museum fecham de 24 a 26/12.",
      "Londres está 1h atrás de Paris. Ajuste o relógio ao desembarcar do Eurostar.",
    ],
  },
  {
    id: "lisbon",
    name: "Lisboa",
    localName: "Lisboa",
    flag: "🇵🇹",
    tagline: "Réveillon 🥂",
    period: "27 a 31/12",
    address: "Rua Pinheiro Chagas, 37 - 1º, Avenidas Novas, 1050-175 Lisboa, Portugal",
    addressShort: "R. Pinheiro Chagas 37 · Avenidas Novas",
    intro:
      "A despedida do ano entre azulejos, miradouros e pastéis de nata. Um bate e volta a Fátima, Batalha, Nazaré e Óbidos, um dia em Belém, Alfama ao som do fado e um brinde antecipado antes do voo de volta.",
    dayIds: ["2026-12-27", "2026-12-28", "2026-12-29", "2026-12-30", "2026-12-31"],
    highlightsTitle: "Para provar em Lisboa",
    highlights: [
      {
        name: "Pastéis de Belém",
        when: "Ter, 29/12",
        detail: "O pastel de nata original, desde 1837. A fila anda rápido.",
        href: "https://pasteisdebelem.pt/",
      },
      {
        name: "Ginjinha de Óbidos",
        when: "Seg, 28/12",
        detail: "Servida num copinho de chocolate, que se come depois.",
        href: maps("Óbidos, Portugal"),
      },
      {
        name: "Ginjinha Sem Rival",
        when: "Dom, 27/12",
        detail: "Licor de ginja no copinho, no Rossio.",
        href: maps("A Ginjinha Sem Rival, Rua das Portas de Santo Antão 7, Lisboa"),
      },
      {
        name: "Bifana e bolo-rei",
        when: "Qualquer dia",
        detail: "O sanduíche de porco das tascas e o bolo típico das festas.",
        href: maps("Confeitaria Nacional, Praça da Figueira, Lisboa"),
      },
    ],
    checklist: [
      {
        title: "Passeios e ingressos",
        items: [
          "Confirmar a reserva da Vision Tours (Fátima, 28/12) e salvar o voucher",
          "Separar euros para o ingresso do Mosteiro da Batalha (não incluso no passeio)",
          "Comprar Mosteiro dos Jerónimos (29/12)",
          "Comprar Castelo de São Jorge (30/12)",
          "Reservar o jantar com fado em Alfama (30/12, às 20h)",
        ],
      },
      {
        title: "Transporte",
        items: [
          "Carregar o cartão Navegante (metrô e elétrico)",
          "Testar o trajeto até a Praça dos Restauradores na véspera do passeio",
          "Reservar táxi para as 3h15 de 31/12 (aeroporto)",
        ],
      },
      {
        title: "Antes de voltar",
        items: [
          "Fazer o check-in online do voo LIS → CDG → GRU",
          "Malas prontas e documentos separados na noite de 30/12",
          "Guardar espaço na mala para os presentes",
        ],
      },
    ],
    closingNotes: [
      "Segunda-feira é dia de folga em muitos museus de Lisboa (Jerónimos, Torre de Belém, Azulejo). Por isso o passeio a Fátima no dia 28 caiu bem.",
      "Lisboa é toda em ladeiras e pedra portuguesa: tênis com boa sola, principalmente com chuva.",
      "O metrô fecha à 1h e só abre às 6h30. Na madrugada de 31/12, só táxi ou aplicativo.",
    ],
  },
];

export const legs: Leg[] = [
  {
    id: "gru-cdg",
    date: "Sex, 18/12",
    mode: "flight",
    from: { code: "GRU", place: "São Paulo · Guarulhos", time: "20:40" },
    to: { code: "CDG", place: "Paris · Charles de Gaulle", time: "11:50" },
    carrier: "Voo noturno",
    details: ["Chegada no sábado, 19/12", "Paris está 4h à frente de Brasília"],
    cities: ["brazil", "paris"],
  },
  {
    id: "par-lon",
    date: "Qui, 24/12",
    mode: "train",
    from: { code: "PNO", place: "Paris · Gare du Nord", time: "07:30" },
    to: { code: "STP", place: "Londres · St Pancras", time: "≈ 09:00" },
    carrier: "Eurostar",
    details: ["Saída do hotel às 5h", "Imigração britânica é feita ainda em Paris"],
    cities: ["paris", "london"],
  },
  {
    id: "lon-lis",
    date: "Dom, 27/12",
    mode: "flight",
    from: { code: "LON", place: "Londres", time: "07:00" },
    to: { code: "LIS", place: "Lisboa · Humberto Delgado", time: "≈ 09:45" },
    carrier: "Voo matinal",
    details: ["Confirmar o aeroporto de Londres", "Londres e Lisboa têm o mesmo fuso"],
    cities: ["london", "lisbon"],
  },
  {
    id: "lis-gru",
    date: "Qui, 31/12",
    mode: "flight",
    from: { code: "LIS", place: "Lisboa", time: "05:30" },
    to: { code: "GRU", place: "Volta ao Brasil", time: "via CDG" },
    carrier: "Conexão em Paris",
    details: ["Saída do hotel às 3h15", "Saída do Espaço Schengen é na conexão em Paris"],
    cities: ["lisbon", "brazil"],
  },
];

export const days: Day[] = [
  {
    id: "2026-12-18",
    date: "18/12",
    dayNumber: 18,
    weekday: "Sexta-feira",
    cities: ["brazil", "paris"],
    title: "Embarque em Guarulhos",
    goal: "Sair de casa com tudo conferido e tentar dormir no voo para chegar inteiro em Paris.",
    stops: [
      {
        time: "17h30",
        title: "Chegada ao GRU",
        text: "Voo internacional: chegar com 3h de antecedência para despacho e imigração.",
        bullets: [
          "Passaportes, seguro-viagem e comprovantes das hospedagens à mão.",
          "Casaco na bagagem de mão: CDG em dezembro faz perto de 5 °C.",
        ],
        links: [{ kind: "maps", href: maps("Aeroporto Internacional de Guarulhos GRU") }],
      },
      {
        time: "20h40",
        title: "Decolagem GRU → CDG",
        text: "Jantar a bordo, máscara de dormir e relógio já no horário de Paris (+4h).",
      },
    ],
  },
  {
    id: "2026-12-19",
    date: "19/12",
    dayNumber: 19,
    weekday: "Sábado",
    cities: ["paris"],
    title: "Chegada, Torre Eiffel e feira de Natal",
    goal: "Primeiro contato com Paris sem exagerar depois da viagem.",
    stops: [
      {
        time: "11h50",
        title: "Pouso em Charles de Gaulle",
        text: "Imigração, malas e trajeto até o hotel. O metrô mais próximo é Corentin Cariou (linha 7).",
        bullets: [
          "RER B até Gare du Nord e metrô, ou táxi com tarifa fixa até a margem direita.",
          "Check-in, banho e descanso até umas 16h.",
        ],
        links: [
          { kind: "maps", label: "Rota até o hotel", href: directions("Aéroport Paris-Charles de Gaulle", PARIS_HOTEL) },
          { kind: "site", label: "RATP", href: "https://www.ratp.fr/" },
        ],
      },
      {
        time: "16h30",
        title: "Trocadéro e Torre Eiffel",
        text: "A melhor vista da torre é do Trocadéro. Depois, descer caminhando até o Champ de Mars e esperar acender.",
        note: "Não precisa subir hoje: a prioridade é a foto e a torre iluminada.",
        links: [
          { kind: "maps", label: "Trocadéro", href: maps("Place du Trocadéro, Paris") },
          { kind: "site", label: "Torre Eiffel", href: "https://www.toureiffel.paris/" },
        ],
      },
      {
        time: "18h",
        title: "Mercado de Natal das Tuileries",
        text: "Barraquinhas, vin chaud, comidinhas típicas e decoração. Jantar por lá mesmo.",
        note: "Confirmar a programação oficial para 19/12.",
        links: [{ kind: "maps", href: maps("Jardin des Tuileries Marché de Noël, Paris") }],
      },
    ],
    tip: "Cansaço bateu? Fique só na Torre Eiffel e deixe a feira para o dia 23.",
  },
  {
    id: "2026-12-20",
    date: "20/12",
    dayNumber: 20,
    weekday: "Domingo",
    cities: ["paris"],
    title: "Disneyland Paris",
    goal: "O castelo da Bela Adormecida com decoração de Natal, do primeiro ao último show.",
    stops: [
      {
        time: "7h",
        title: "Café e saída cedo",
        text: "RER A até Marne-la-Vallée–Chessy. Conte 1h a 1h30 de trajeto.",
        links: [
          { kind: "maps", label: "Rota até a Disney", href: directions(PARIS_HOTEL, "Marne-la-Vallée Chessy") },
        ],
      },
      {
        time: "Abertura",
        title: "Main Street e o castelo",
        bullets: [
          "Main Street, U.S.A. e fotos no castelo.",
          "Big Thunder Mountain, Pirates of the Caribbean e Phantom Manor.",
        ],
        note: "Ajuste a ordem pelas filas do app oficial.",
        links: [
          { kind: "tickets", href: "https://www.disneylandparis.com/" },
          { kind: "maps", href: maps("Disneyland Park, Marne-la-Vallée") },
        ],
      },
      {
        time: "12h",
        title: "Almoço rápido no parque",
      },
      {
        time: "13h",
        title: "Atrações, lojas e personagens",
        text: "Pausas para se aquecer e fotos com a decoração de Natal.",
      },
      {
        time: "Noite",
        title: "Parada e show de encerramento",
        text: "Conferir os horários no calendário oficial e voltar direto para o hotel.",
      },
    ],
    tip: "Dia longo e de muita caminhada: nada de pub hoje.",
  },
  {
    id: "2026-12-21",
    date: "21/12",
    dayNumber: 21,
    weekday: "Segunda-feira",
    cities: ["paris"],
    title: "Louvre, Notre-Dame e Galeries Lafayette",
    goal: "O museu, a catedral e Paris decorada para o Natal.",
    stops: [
      {
        time: "9h",
        title: "Museu do Louvre",
        bullets: ["Mona Lisa, Vênus de Milo e Vitória de Samotrácia.", "Fotos na pirâmide."],
        note: "Ingresso com horário marcado. Três horas dão para uma visita direcionada.",
        links: [
          { kind: "tickets", href: "https://www.louvre.fr/" },
          { kind: "maps", href: maps("Musée du Louvre, Paris") },
        ],
      },
      {
        time: "12h",
        title: "Almoço numa brasserie",
        text: "Perto do Louvre ou do Palais-Royal. Croque-monsieur ou sopa de cebola.",
      },
      {
        time: "13h30",
        title: "Notre-Dame de Paris",
        text: "Île de la Cité, fachada, interior (se disponível) e margens do Sena.",
        links: [
          { kind: "site", href: "https://www.notredamedeparis.fr/" },
          { kind: "maps", href: maps("Cathédrale Notre-Dame de Paris") },
        ],
      },
      {
        time: "15h30",
        title: "Place Vendôme",
        text: "Parada curta para fotos da coluna e da decoração.",
        links: [{ kind: "maps", href: maps("Place Vendôme, Paris") }],
      },
      {
        time: "16h30",
        title: "Galeries Lafayette Haussmann",
        text: "A cúpula, a árvore de Natal de 2026, as vitrines e o terraço (se aberto).",
        links: [
          { kind: "site", href: "https://haussmann.galerieslafayette.com/" },
          { kind: "maps", href: maps("Galeries Lafayette Haussmann, 40 Boulevard Haussmann, Paris") },
        ],
      },
      {
        time: "19h",
        title: "The Green Linnet",
        text: "Pub irlandês no centro para fechar o dia.",
        links: [{ kind: "maps", href: maps("The Green Linnet, 8 Avenue Victoria, 75004 Paris") }],
      },
    ],
  },
  {
    id: "2026-12-22",
    date: "22/12",
    dayNumber: 22,
    weekday: "Terça-feira",
    cities: ["paris"],
    title: "Palácio de Versalhes completo",
    goal: "Palácio, jardins, Grand e Petit Trianon e o Hameau de la Reine.",
    stops: [
      {
        time: "7h30",
        title: "Trem até Versailles Château–Rive Gauche",
        text: "RER C e mais 10 a 15 minutos a pé até a entrada.",
        links: [
          { kind: "maps", label: "Rota até Versalhes", href: directions(PARIS_HOTEL, "Château de Versailles") },
        ],
      },
      {
        time: "9h",
        title: "Palácio principal",
        bullets: ["Apartamentos reais.", "Galeria dos Espelhos.", "Salões cerimoniais."],
        links: [
          { kind: "tickets", href: "https://en.chateauversailles.fr/" },
          { kind: "maps", href: maps("Château de Versailles") },
        ],
      },
      { time: "11h45", title: "Almoço rápido" },
      {
        time: "12h30",
        title: "Jardins e domínio do Trianon",
        bullets: ["Jardins de Versalhes.", "Grand Trianon.", "Petit Trianon.", "Hameau de la Reine."],
        note: "Em dezembro algumas áreas fecham mais cedo. Confirme antes.",
        links: [{ kind: "maps", href: maps("Petit Trianon, Versailles") }],
      },
      {
        time: "16h30",
        title: "Volta a Paris",
        text: "Jantar perto do hotel e descanso.",
      },
    ],
  },
  {
    id: "2026-12-23",
    date: "23/12",
    dayNumber: 23,
    weekday: "Quarta-feira",
    cities: ["paris"],
    title: "Montmartre, Champs-Élysées e Primark",
    goal: "Último dia completo e o mais apertado. Começar cedo e limitar o tempo nas lojas.",
    stops: [
      {
        time: "8h30",
        title: "Montmartre e Sacré-Cœur",
        text: "A vista da basílica, Place du Tertre e as ruelas de pedra. Pausa para um café.",
        links: [
          { kind: "site", href: "https://www.sacre-coeur-montmartre.com/" },
          { kind: "maps", href: maps("Basilique du Sacré-Cœur de Montmartre") },
        ],
      },
      {
        time: "11h45",
        title: "Arco do Triunfo",
        text: "Fotos da praça e, se der tempo, subida ao terraço.",
        links: [
          { kind: "tickets", href: "https://www.paris-arc-de-triomphe.fr/" },
          { kind: "maps", href: maps("Arc de Triomphe, Paris") },
        ],
      },
      {
        time: "13h",
        title: "Champs-Élysées e almoço",
        text: "Um trecho da avenida, vitrines e iluminação de Natal.",
        links: [{ kind: "maps", href: maps("Avenue des Champs-Élysées, Paris") }],
      },
      {
        time: "14h",
        title: "Primark no Qwartz",
        text: "Reserve de 2 a 3 horas com o trajeto. É prioridade, não deixe as paradas anteriores esticarem.",
        links: [{ kind: "maps", href: maps("Primark Qwartz, 4 Boulevard Gallieni, Villeneuve-la-Garenne") }],
      },
      {
        time: "18h",
        title: "Feira de Natal da Champs-Élysées",
        text: "Últimas fotos de Paris no Natal, doces e bebidas quentes.",
        links: [{ kind: "maps", href: maps("Marché de Noël Champs-Élysées, Paris") }],
      },
      {
        time: "20h",
        title: "The Bowler",
        text: "Uma última bebida e volta cedo: amanhã a saída é às 5h.",
        links: [{ kind: "maps", href: maps("The Bowler pub, 13 Rue d'Artois, 75008 Paris") }],
      },
    ],
    tip: "Antes de dormir: malas fechadas, passaportes separados, táxi confirmado.",
  },
  {
    id: "2026-12-24",
    date: "24/12",
    dayNumber: 24,
    weekday: "Quinta-feira",
    cities: ["paris", "london"],
    title: "Eurostar e véspera de Natal em Londres",
    goal: "Mercados e lugares históricos antes de tudo fechar cedo na véspera.",
    stops: [
      {
        time: "5h",
        title: "Saída do hotel em Paris",
        text: "Táxi até a Gare du Nord. Controle de passaporte britânico e embarque.",
        links: [
          { kind: "maps", label: "Gare du Nord", href: maps("Gare du Nord Eurostar, Paris") },
          { kind: "site", label: "Eurostar", href: "https://www.eurostar.com/" },
        ],
      },
      {
        time: "7h30",
        title: "Eurostar Paris → Londres",
        text: "Chegada em St Pancras por volta das 9h (horário de Londres, 1h a menos).",
      },
      {
        time: "10h30",
        title: "Borough Market",
        text: "Barracas de comida, queijos e doces. Almoço antecipado por aqui.",
        note: "Na véspera de Natal funciona das 8h às 15h e fecha de 25 a 27/12.",
        links: [
          { kind: "site", href: "https://boroughmarket.org.uk/" },
          { kind: "maps", href: maps("Borough Market, London") },
        ],
      },
      {
        time: "12h15",
        title: "St Dunstan in the East",
        text: "Jardim entre as ruínas de uma igreja gótica. Parada gratuita de 30 minutos.",
        links: [{ kind: "maps", href: maps("St Dunstan in the East Church Garden, London") }],
      },
      {
        time: "13h",
        title: "Leadenhall Market",
        text: "Mercado vitoriano coberto, com teto ornamentado e decoração festiva.",
        links: [
          { kind: "site", href: "https://leadenhallmarket.co.uk/" },
          { kind: "maps", href: maps("Leadenhall Market, London") },
        ],
      },
      {
        time: "14h",
        title: "Tower Bridge",
        text: "Caminhada pela ponte e vista da Tower of London.",
        links: [
          { kind: "site", href: "https://www.towerbridge.org.uk/" },
          { kind: "maps", href: maps("Tower Bridge, London") },
        ],
      },
      {
        time: "16h",
        title: "Southbank Centre Winter Market",
        text: "Feira de Natal à beira do Tâmisa, com bebidas quentes e lembranças.",
        links: [
          { kind: "site", href: "https://www.southbankcentre.co.uk/" },
          { kind: "maps", href: maps("Southbank Centre Winter Market, London") },
        ],
      },
      {
        time: "18h30",
        title: "London Eye iluminada e volta",
        text: "Vista de fora e retorno para Cricklewood.",
        links: [
          { kind: "site", href: "https://www.londoneye.com/" },
          { kind: "maps", label: "Rota até a hospedagem", href: directions("London Eye", LONDON_HOTEL) },
        ],
      },
    ],
    tip: "Se o Eurostar atrasar, encurte Tower Bridge. Borough Market e Southbank são prioridade.",
  },
  {
    id: "2026-12-25",
    date: "25/12",
    dayNumber: 25,
    weekday: "Sexta-feira",
    cities: ["london"],
    title: "Natal em Westminster",
    goal: "Clima natalino ao ar livre, sem depender de atrações abertas ou de metrô.",
    stops: [
      {
        time: "10h",
        title: "Buckingham Palace",
        text: "Fachada e portões. Sem troca da guarda no dia de Natal.",
        links: [
          { kind: "site", href: "https://www.rct.uk/visit/buckingham-palace" },
          { kind: "maps", href: maps("Buckingham Palace, London") },
        ],
      },
      {
        time: "11h",
        title: "St James's Park",
        text: "O lago, as pontes e os prédios históricos ao fundo.",
        links: [
          { kind: "site", href: "https://www.royalparks.org.uk/" },
          { kind: "maps", href: maps("St James's Park, London") },
        ],
      },
      {
        time: "12h",
        title: "Big Ben e Westminster",
        text: "Parlamento, Westminster Bridge e a vista do Tâmisa.",
        links: [{ kind: "maps", href: maps("Big Ben, London") }],
      },
      {
        time: "13h",
        title: "Almoço de Natal reservado",
        text: "Um Christmas roast tradicional: carne assada, batatas, legumes e molho.",
        note: "Reservar com antecedência. Não deixe para o dia.",
      },
      {
        time: "15h",
        title: "Trafalgar Square",
        text: "A árvore de Natal norueguesa, se ainda houver disposição.",
        optional: true,
        links: [{ kind: "maps", href: maps("Trafalgar Square, London") }],
      },
    ],
    tip: "Hoje não há metrô nem ônibus. Ida e volta de táxi ou aplicativo, reservados antes.",
  },
  {
    id: "2026-12-26",
    date: "26/12",
    dayNumber: 26,
    weekday: "Sábado",
    cities: ["london"],
    title: "Notting Hill e Covent Garden",
    goal: "Casas coloridas de dia, mercados de Natal à tarde, Winter Wonderland à noite.",
    stops: [
      {
        time: "9h30",
        title: "Notting Hill",
        text: "As casas coloridas e a região de Lancaster Road.",
        links: [{ kind: "maps", href: maps("Lancaster Road, Notting Hill, London") }],
      },
      {
        time: "11h",
        title: "Portobello Road",
        text: "Antiguidades e vintage. É Boxing Day: nem tudo estará aberto.",
        links: [{ kind: "maps", href: maps("Portobello Road Market, London") }],
      },
      { time: "12h", title: "Almoço em Notting Hill" },
      {
        time: "13h",
        title: "Covent Garden",
        text: "Mercado coberto, árvore de Natal e uma pausa para café ou sobremesa.",
        links: [
          { kind: "site", href: "https://www.coventgarden.london/" },
          { kind: "maps", href: maps("Covent Garden Market, London") },
        ],
      },
      {
        time: "14h30",
        title: "Leicester Square Christmas Market",
        text: "Feira menor, ótima para lembranças.",
        links: [{ kind: "maps", href: maps("Leicester Square, London") }],
      },
      {
        time: "15h30",
        title: "Trafalgar Square",
        text: "Se não deu no dia 25. Senão, um café pelo centro.",
        links: [{ kind: "maps", href: maps("Trafalgar Square, London") }],
      },
      {
        time: "Noite",
        title: "Hyde Park Winter Wonderland",
        text: "Roda-gigante, patinação, brinquedos e feira. Ingresso com horário.",
        optional: true,
        links: [
          { kind: "tickets", href: "https://hydeparkwinterwonderland.com/" },
          { kind: "maps", href: maps("Hyde Park Winter Wonderland, London") },
        ],
      },
    ],
    tip: "O voo para Lisboa é às 7h: malas prontas antes de sair à noite.",
  },
  {
    id: "2026-12-27",
    date: "27/12",
    dayNumber: 27,
    weekday: "Domingo",
    cities: ["london", "lisbon"],
    title: "Voo para Lisboa e a Baixa iluminada",
    goal: "Chegar, largar as malas e conhecer o coração da cidade com calma depois da madrugada.",
    stops: [
      {
        time: "4h",
        title: "Táxi até o aeroporto de Londres",
        text: "Para um voo às 7h, chegue ao aeroporto até as 5h.",
        note: "Confirmar qual aeroporto (Heathrow, Gatwick, Luton ou Stansted) e reservar o táxi na véspera.",
      },
      {
        time: "7h",
        title: "Voo Londres → Lisboa",
        text: "Cerca de 2h40 de voo. Mesmo fuso horário, sem mexer no relógio.",
      },
      {
        time: "10h",
        title: "Metrô linha vermelha até Saldanha",
        text: "Do aeroporto até Saldanha são uns 20 minutos, sem baldeação. A hospedagem fica a 5 minutos a pé.",
        links: [
          { kind: "maps", label: "Rota até a hospedagem", href: directions("Aeroporto Humberto Delgado, Lisboa", LISBON_HOTEL) },
          { kind: "site", label: "Metro de Lisboa", href: "https://www.metrolisboa.pt/" },
        ],
      },
      {
        time: "13h",
        title: "Almoço e Rossio",
        text: "Praça do Rossio, Praça da Figueira e um copinho de ginjinha.",
        links: [{ kind: "maps", href: maps("A Ginjinha Sem Rival, Rua das Portas de Santo Antão 7, Lisboa") }],
      },
      {
        time: "14h30",
        title: "Rua Augusta e Praça do Comércio",
        text: "A árvore de Natal gigante da praça e a vista do Tejo. Dá para subir no Arco da Rua Augusta.",
        links: [{ kind: "maps", href: maps("Arco da Rua Augusta, Lisboa") }],
      },
      {
        time: "16h",
        title: "Chiado",
        text: "Livraria Bertrand (a mais antiga do mundo em funcionamento) e café na A Brasileira.",
        links: [
          { kind: "maps", label: "Livraria Bertrand", href: maps("Livraria Bertrand Chiado, Lisboa") },
          { kind: "maps", label: "A Brasileira", href: maps("Café A Brasileira, Chiado, Lisboa") },
        ],
      },
      {
        time: "17h",
        title: "Pôr do sol no Miradouro de São Pedro de Alcântara",
        text: "O castelo e a Baixa ganhando luz. O sol se põe por volta das 17h20.",
        links: [{ kind: "maps", href: maps("Miradouro de São Pedro de Alcântara, Lisboa") }],
      },
      {
        time: "19h",
        title: "Wonderland Lisboa",
        text: "A feira de Natal da cidade, no Parque Eduardo VII, a 15 minutos a pé da hospedagem. Roda-gigante, pista de gelo e barraquinhas.",
        optional: true,
        note: "Confirmar se ainda funciona em 27/12.",
        links: [{ kind: "maps", href: maps("Wonderland Lisboa, Parque Eduardo VII") }],
      },
    ],
    tip: "Dia que começou às 4h da manhã. Se o corpo pedir, troque a Wonderland por uma soneca e um jantar perto de Saldanha.",
  },
  {
    id: "2026-12-28",
    date: "28/12",
    dayNumber: 28,
    weekday: "Segunda-feira",
    cities: ["lisbon"],
    title: "Fátima, Batalha, Nazaré e Óbidos",
    goal: "Bate e volta de 10 horas com a Vision Tours: o santuário, o mosteiro, as ondas gigantes e a vila medieval.",
    stops: [
      {
        time: "7h",
        title: "Saída da hospedagem",
        text: "Metrô de Saldanha até Restauradores, com troca da linha amarela para a azul no Marquês de Pombal (uns 15 minutos). De táxi são uns 10 minutos.",
        links: [
          { kind: "maps", label: "Rota até o ponto de encontro", href: directions(LISBON_HOTEL, "Praça dos Restauradores 24, 1250-096 Lisboa") },
        ],
      },
      {
        time: "7h30",
        title: "Ponto de encontro na Praça dos Restauradores",
        text: "Praça dos Restauradores, 24 · 1250-096 Lisboa. Apresentar o voucher da reserva ao guia.",
        note: "Chegar às 7h30 em ponto: o grupo sai às 8h e não espera.",
        links: [
          { kind: "maps", href: maps("Praça dos Restauradores 24, 1250-096 Lisboa") },
          { kind: "site", label: "Vision Tours", href: "https://www.visiontoursportugal.com/tour/907817" },
          { kind: "site", label: "WhatsApp da agência", href: "https://wa.me/351930414756" },
        ],
      },
      {
        time: "8h",
        title: "Saída de Lisboa",
        text: "Viagem de van com o guia comentando pelo caminho. São cerca de 1h30 até Fátima.",
      },
      {
        time: "≈ 9h30",
        title: "Santuário de Fátima",
        text: "A Capelinha das Aparições, a Basílica de Nossa Senhora do Rosário, onde estão os três pastorinhos, e a Basílica da Santíssima Trindade.",
        links: [
          { kind: "site", href: "https://www.fatima.pt/" },
          { kind: "maps", href: maps("Santuário de Fátima") },
        ],
      },
      {
        time: "≈ 12h",
        title: "Nazaré e almoço",
        text: "O mirante do Sítio sobre a praia das ondas gigantes e almoço livre com peixe fresco.",
        links: [{ kind: "maps", label: "Miradouro do Sítio", href: maps("Miradouro do Suberco, Nazaré") }],
      },
      {
        time: "≈ 14h30",
        title: "Mosteiro da Batalha",
        text: "Gótico e manuelino, erguido para celebrar a Batalha de Aljubarrota. As Capelas Imperfeitas não têm teto até hoje.",
        note: "O ingresso dos monumentos não está incluído no passeio.",
        links: [
          { kind: "tickets", href: "https://www.museusemonumentos.pt/" },
          { kind: "maps", href: maps("Mosteiro da Batalha") },
        ],
      },
      {
        time: "≈ 16h",
        title: "Óbidos",
        text: "A vila dentro das muralhas, as ruelas de casas brancas e a ginjinha no copinho de chocolate.",
        links: [{ kind: "maps", href: maps("Porta da Vila, Óbidos") }],
      },
      {
        time: "≈ 18h",
        title: "Volta à Praça dos Restauradores",
        text: "Jantar pela Baixa e volta de metrô. Se ainda houver pique, suba a Avenida da Liberdade iluminada.",
      },
    ],
    tip: "A ordem das paradas pode mudar conforme o guia. Leve casaco, guarda-chuva e alguns euros para ingressos e almoço.",
  },
  {
    id: "2026-12-29",
    date: "29/12",
    dayNumber: 29,
    weekday: "Terça-feira",
    cities: ["lisbon"],
    title: "Belém e o Tejo",
    goal: "A Lisboa dos descobrimentos e o pastel de nata original, terminando no Cais do Sodré.",
    stops: [
      {
        time: "9h30",
        title: "Mosteiro dos Jerónimos",
        text: "O claustro manuelino e o túmulo de Vasco da Gama na igreja de Santa Maria.",
        note: "A entrada da igreja é gratuita; o claustro precisa de ingresso.",
        links: [
          { kind: "tickets", href: "https://www.museusemonumentos.pt/" },
          { kind: "maps", href: maps("Mosteiro dos Jerónimos, Lisboa") },
        ],
      },
      {
        time: "11h",
        title: "Pastéis de Belém",
        text: "Comer ali mesmo, quentinho, com canela e açúcar.",
        links: [
          { kind: "site", href: "https://pasteisdebelem.pt/" },
          { kind: "maps", href: maps("Pastéis de Belém, Rua de Belém 84, Lisboa") },
        ],
      },
      {
        time: "11h45",
        title: "Padrão dos Descobrimentos e Torre de Belém",
        text: "Caminhada pela beira do rio. O mirante do Padrão tem vista para a rosa dos ventos no chão.",
        links: [
          { kind: "site", label: "Padrão", href: "https://padraodosdescobrimentos.pt/" },
          { kind: "maps", label: "Torre de Belém", href: maps("Torre de Belém, Lisboa") },
        ],
      },
      {
        time: "13h",
        title: "MAAT e almoço",
        text: "A cobertura ondulada do museu é um mirante gratuito sobre o Tejo.",
        links: [
          { kind: "site", href: "https://www.maat.pt/" },
          { kind: "maps", href: maps("MAAT, Lisboa") },
        ],
      },
      {
        time: "15h",
        title: "LX Factory",
        text: "Antiga fábrica com lojas, livraria Ler Devagar e cafés, sob a Ponte 25 de Abril.",
        links: [
          { kind: "site", href: "https://lxfactory.com/" },
          { kind: "maps", href: maps("LX Factory, Lisboa") },
        ],
      },
      {
        time: "18h",
        title: "Time Out Market e Pink Street",
        text: "Jantar no mercado do Cais do Sodré e uma volta pela Rua Nova do Carvalho.",
        links: [
          { kind: "site", href: "https://www.timeoutmarket.com/lisboa/" },
          { kind: "maps", href: maps("Time Out Market Lisboa") },
        ],
      },
    ],
    tip: "Elétrico 15E da Praça da Figueira até Belém. Vá cedo: depois das 11h os Jerónimos lotam.",
  },
  {
    id: "2026-12-30",
    date: "30/12",
    dayNumber: 30,
    weekday: "Quarta-feira",
    cities: ["lisbon"],
    title: "Alfama, castelo e réveillon antecipado",
    goal: "A Lisboa antiga de manhã e o último jantar da viagem ao som do fado.",
    stops: [
      {
        time: "8h30",
        title: "Elétrico 28",
        text: "Embarque cedo no Martim Moniz, antes da fila, e desça perto do castelo.",
        links: [
          { kind: "site", label: "Carris", href: "https://www.carris.pt/" },
          { kind: "maps", href: maps("Martim Moniz elétrico 28, Lisboa") },
        ],
      },
      {
        time: "9h30",
        title: "Castelo de São Jorge",
        text: "Muralhas, pavões e a melhor vista panorâmica da cidade.",
        links: [
          { kind: "tickets", href: "https://castelodesaojorge.pt/" },
          { kind: "maps", href: maps("Castelo de São Jorge, Lisboa") },
        ],
      },
      {
        time: "11h30",
        title: "Miradouros de Alfama",
        text: "Portas do Sol e Santa Luzia, com os azulejos e o rio lá embaixo.",
        links: [
          { kind: "maps", label: "Portas do Sol", href: maps("Miradouro das Portas do Sol, Lisboa") },
          { kind: "maps", label: "Santa Luzia", href: maps("Miradouro de Santa Luzia, Lisboa") },
        ],
      },
      {
        time: "12h30",
        title: "Sé de Lisboa e almoço em Alfama",
        text: "A catedral mais antiga da cidade e uma tasca pelas vielas.",
        links: [{ kind: "maps", href: maps("Sé de Lisboa") }],
      },
      {
        time: "15h",
        title: "Museu Nacional do Azulejo",
        text: "Cinco séculos de azulejos e um painel de Lisboa antes do terremoto de 1755.",
        links: [
          { kind: "tickets", href: "https://www.museusemonumentos.pt/" },
          { kind: "maps", href: maps("Museu Nacional do Azulejo, Lisboa") },
        ],
      },
      {
        time: "17h30",
        title: "Descanso e malas",
        text: "Volta à hospedagem para fechar as malas antes do jantar.",
      },
      {
        time: "20h",
        title: "Jantar com fado em Alfama",
        text: "O brinde de fim de ano da viagem, com bacalhau e vinho verde.",
        note: "Reservar. Voltar até 22h30: o táxi para o aeroporto é às 3h15.",
        links: [
          { kind: "site", label: "Clube de Fado", href: "https://www.clube-de-fado.com/" },
          { kind: "maps", href: maps("Clube de Fado, Alfama, Lisboa") },
        ],
      },
    ],
    tip: "Alternativa à tarde: Oceanário de Lisboa, no Parque das Nações.",
  },
  {
    id: "2026-12-31",
    date: "31/12",
    dayNumber: 31,
    weekday: "Quinta-feira",
    cities: ["lisbon", "brazil"],
    title: "Volta para casa, a tempo da virada",
    goal: "Madrugada em Lisboa, conexão em Paris e o réveillon no Brasil.",
    stops: [
      {
        time: "3h15",
        title: "Táxi para o aeroporto",
        text: "Saldanha fica a uns 15 minutos do aeroporto. O metrô ainda está fechado.",
        links: [
          { kind: "maps", label: "Rota até o aeroporto", href: directions(LISBON_HOTEL, "Aeroporto Humberto Delgado, Lisboa", "driving") },
        ],
      },
      {
        time: "5h30",
        title: "Voo Lisboa → Paris",
        text: "Pouso em Paris com 1h a mais no relógio.",
      },
      {
        time: "Conexão",
        title: "Paris → Brasil",
        text: "A saída do Espaço Schengen (carimbo de saída) acontece aqui. Siga as placas de conexões internacionais.",
        note: "Conferir terminal e horário do voo para o Brasil no cartão de embarque.",
      },
    ],
    tip: "Feliz Ano Novo! 🥂",
  },
];

export const generalChecklist: ChecklistGroup[] = [
  {
    title: "Documentos",
    items: [
      "Passaportes válidos por mais de 6 meses",
      "Seguro-viagem (obrigatório no Espaço Schengen)",
      "Verificar se o ETIAS europeu já é exigido",
    ],
  },
  {
    title: "Mala",
    items: [
      "Casacos, luvas, cachecol e calçado que aguente chuva",
      "Adaptadores de tomada: europeu (Paris, Lisboa) e britânico (Londres)",
      "Bateria portátil e chip ou eSIM com dados na Europa",
    ],
  },
];

export const usefulLinks: TripLink[] = [
  { kind: "site", label: "ETA do Reino Unido", href: "https://www.gov.uk/eta" },
  { kind: "site", label: "ETIAS (Europa)", href: "https://travel-europe.europa.eu/etias_en" },
  { kind: "site", label: "Eurostar", href: "https://www.eurostar.com/" },
  { kind: "site", label: "RATP (Paris)", href: "https://www.ratp.fr/" },
  { kind: "site", label: "TfL (Londres)", href: "https://tfl.gov.uk/" },
  { kind: "site", label: "Metro de Lisboa", href: "https://www.metrolisboa.pt/" },
];

export const cityById = Object.fromEntries(cities.map((c) => [c.id, c])) as Record<City["id"], City>;
export const dayById = Object.fromEntries(days.map((d) => [d.id, d])) as Record<string, Day>;
