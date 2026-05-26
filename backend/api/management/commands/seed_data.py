from django.core.management.base import BaseCommand
from api.models import Category, Product

class Command(BaseCommand):
    help = 'Seeds categories and premium jersey products into the database'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Product.objects.all().delete()
        Category.objects.all().delete()

        self.stdout.write('Seeding categories...')
        full_sleeve = Category.objects.create(name='Full Sleeve', slug='full-sleeve')
        half_sleeve = Category.objects.create(name='Half Sleeve', slug='half-sleeve')
        five_sleeve = Category.objects.create(name='Five Sleeve', slug='five-sleeve')

        self.stdout.write('Seeding premium products...')
        
        # 1. Barcelona 18-19 Home
        Product.objects.create(
            name='Barcelona FC 2018-19 Home Kit',
            slug='barcelona-18-19-home',
            description='The official Nike FC Barcelona 2018-19 Home Jersey. Features the iconic 10 vertical red and blue stripes representing the districts of Barcelona, a pristine heat-applied Rakuten sponsor logo, and the premium LFP shield on the sleeve.',
            price=120.00,
            category=five_sleeve,
            image_url='/barca_jersey.png',
            rating=4.95,
            colors='Deep Red, Royal Blue',
            is_featured=True,
            details=[
                'PLAYER: MESSI',
                'SLIM FIT',
                'VAPORKNIT MATERIAL',
                'CREW NECK & SHORT SLEEVE & HEAT-APPLIED SHIELD'
            ],
            stats={
                'ranking': '2',
                'founded': '1899',
                'country': 'Spain',
                'recentMatch': 'Real Sociedad 0-1 (W)',
                'matchTitle': 'PHOTO AND VIDEO REVIEW OF THE MATCH WITH REAL SOCIEDAD',
                'bgColor': 'from-brand-barcaRed to-brand-barcaBlue',
                'accentColor': '#F5C119',
                'backdropText': 'BARCELONA FC'
            }
        )

        # 2. Inter Milan Home Retro
        Product.objects.create(
            name='Inter Milan 2017-18 Home Kit',
            slug='inter-milan-17-18-home',
            description='The official Nike Inter Milan Home Jersey from their legendary champions run. Features the elegant vertical Nerazzurri blue and black stripes, highly detailed gold stars, and the classic white Pirelli heat-pressed logo.',
            price=115.00,
            category=five_sleeve,
            image_url='/inter_jersey.png',
            rating=4.88,
            colors='Electric Blue, Pitch Black',
            is_featured=True,
            details=[
                'PLAYER: ICARDI',
                'SLIM FIT',
                'DRI-FIT MATERIAL',
                'NERAZZURRI EMBROIDERY & SHORT SLEEVE'
            ],
            stats={
                'ranking': '1',
                'founded': '1908',
                'country': 'Italy',
                'recentMatch': 'AC Milan 5-1 (W)',
                'matchTitle': 'NERAZZURRI GLORY AT SAN SIRO: DOMINANT DERBY VICTORY',
                'bgColor': 'from-[#001D40] to-brand-interBlue',
                'accentColor': '#F5C119',
                'backdropText': 'INTERNAZIONALE FC'
            }
        )

        # 3. Argentina 2024 Home Kit
        Product.objects.create(
            name='Argentina 2024 Copa America Home Kit',
            slug='argentina-2024-home',
            description='The official Adidas Argentina 2024 Home Jersey as worn during their epic Copa America campaign. Featuring the iconic albiceleste white and sky blue vertical stripes, three embroidered gold stars, and the Sol de Mayo emblem on the collar.',
            price=130.00,
            category=full_sleeve,
            image_url='/arg_jersey.png',
            rating=4.98,
            colors='Sky Blue, White, Gold',
            is_featured=True,
            details=[
                'PLAYER: MESSI',
                'SLIM FIT',
                'HEAT.RDY MATERIAL',
                'THREE STARS EMBROIDERY & SHORT SLEEVE'
            ],
            stats={
                'ranking': '1',
                'founded': '1893',
                'country': 'Argentina',
                'recentMatch': 'Canada 2-0 (W)',
                'matchTitle': 'ALBICELESTE DOMINATION: MESSI LEADS TEAM TO COPA FINALS',
                'bgColor': 'from-[#4D88FF] to-[#D5E6FF]',
                'accentColor': '#bd922b',
                'backdropText': 'ARGENTINA AFA'
            }
        )

        # 4. Portugal 2024 Home
        Product.objects.create(
            name='Portugal 2024 Euro Home Kit',
            slug='portugal-2024-home',
            description='The official Nike Portugal 2024 Home Jersey celebrating their national heritage. Elegant crimson red with deep green accents and golden shield detailing.',
            price=125.00,
            category=half_sleeve,
            image_url='/portugal_jersey.png',
            rating=4.89,
            colors='Crimson, Deep Green, Gold',
            is_featured=True,
            details=[
                'PLAYER: RONALDO',
                'SLIM FIT',
                'DRI-FIT MATERIAL',
                'CRIMSON GREEN PIPING & SHORT SLEEVE'
            ],
            stats={
                'ranking': '8',
                'founded': '1914',
                'country': 'Portugal',
                'recentMatch': 'Czechia 2-1 (W)',
                'matchTitle': 'CRISTIANO MESMERIZES AT LEIPZIG STADIUM IN DEBUT MATCH',
                'bgColor': 'from-[#8B0000] to-[#006400]',
                'accentColor': '#E3C488',
                'backdropText': 'PORTUGAL FPF'
            }
        )

        # 5. France 2024 Home
        Product.objects.create(
            name='France 2024 Euro Home Kit',
            slug='france-2024-home',
            description='The official France 2024 Home Jersey in dynamic royal blue. Featuring the giant gold Gallic rooster emblem on the chest.',
            price=125.00,
            category=full_sleeve,
            image_url='/france_jersey.png',
            rating=4.82,
            colors='Royal Blue, White, Red',
            is_featured=False,
            details=[
                'PLAYER: MBAPPÉ',
                'ATHLETIC FIT',
                'DRI-FIT ADV MATERIAL',
                'GIANT ROOSTER EMBROIDERY & SHORT SLEEVE'
            ],
            stats={}
        )

        # 6. Brazil 2024 Home Kit
        Product.objects.create(
            name='Brazil 2024 Copa America Home Kit',
            slug='brazil-2024-home',
            description='The official Brazil 2024 Home Jersey in vibrant yellow. Intricate pattern detailing celebrating local Brazilian flora and fauna.',
            price=125.00,
            category=full_sleeve,
            image_url='/brazil_jersey.png',
            rating=4.94,
            colors='Neon Yellow, Green',
            is_featured=True,
            details=[
                'PLAYER: VINICIUS JR.',
                'SLIM FIT',
                'DRI-FIT ADV MATERIAL',
                'SAMBA EMBOSSED PATTERN & SHORT SLEEVE'
            ],
            stats={
                'ranking': '5',
                'founded': '1914',
                'country': 'Brazil',
                'recentMatch': 'Paraguay 4-1 (W)',
                'matchTitle': 'SAMBA MAGIC IN NEVADA: SELEÇÃO DRIBBLES TO CHAMPIONSHIP FORM',
                'bgColor': 'from-[#FFE000] to-[#002776]',
                'accentColor': '#009739',
                'backdropText': 'BRASIL CBF'
            }
        )

        # 7. Real Madrid 2017-18 Home Retro
        Product.objects.create(
            name='Real Madrid 2017-18 Home Kit',
            slug='real-madrid-17-18-home',
            description='The historic Adidas Real Madrid Home Jersey worn during their historic Champions League three-peat. Sleek pure white with diagonal sky-blue stripes and gold details.',
            price=110.00,
            category=five_sleeve,
            image_url='/madrid_jersey.png',
            rating=4.92,
            colors='White, Teal Blue',
            is_featured=True,
            details=[
                'PLAYER: RONALDO',
                'REGULAR FIT',
                'DOTKNIT MATERIAL',
                'POLO & FULL SLEEVE & EMBROIDERY'
            ],
            stats={
                'ranking': '1 (UEFA)',
                'founded': '1902',
                'country': 'Spain',
                'recentMatch': 'Liverpool 3-1 (W)',
                'matchTitle': 'DECIMOTERCERA TRIUMPH IN KIEV: RETRO CHAMPIONS MEMORIES',
                'bgColor': 'from-[#1E3A8A] to-[#F1F5F9]',
                'accentColor': '#E3C488',
                'backdropText': 'REAL MADRID'
            }
        )

        # 8. Germany 2024 Euro Home
        Product.objects.create(
            name='Germany 2024 Euro Home Kit',
            slug='germany-2024-home',
            description='The official Adidas Germany 2024 Home Jersey. Classic white base with stunning black, red, and gold flame patterns climbing up the shoulders.',
            price=125.00,
            category=half_sleeve,
            image_url='/germany_jersey.png',
            rating=4.85,
            colors='White, Black, Red, Gold',
            is_featured=False,
            details=[
                'PLAYER: KROOS',
                'SLIM FIT',
                'HEAT.RDY MATERIAL',
                'FLAME PATTERN DECK & SHORT SLEEVE'
            ],
            stats={}
        )

        # 9. Al-Nassr FC 2023-24 Home Kit
        Product.objects.create(
            name='Al-Nassr FC 2023-24 Home Kit',
            slug='al-nassr-23-24-home',
            description='The official Nike Al-Nassr 2023-24 Home Jersey in dynamic neon yellow and electric royal blue. Embossed with subtle vertical pattern stripes and pristine golden highlights.',
            price=118.00,
            category=half_sleeve,
            image_url='/nassr_jersey.png',
            rating=4.89,
            colors='Neon Yellow, Royal Blue',
            is_featured=True,
            details=[
                'PLAYER: RONALDO',
                'SLIM FIT',
                'DRI-FIT MATERIAL',
                'GOLD EMBOSSED PANEL & SHORT SLEEVE'
            ],
            stats={
                'ranking': '2 (SPL)',
                'founded': '1955',
                'country': 'Saudi Arabia',
                'recentMatch': 'Al-Ittihad 4-2 (W)',
                'matchTitle': 'RECORD BREAKER: CR7 SECURES SINGLE SEASON SCORING PINNACLE',
                'bgColor': 'from-[#FFE000] to-[#005CA9]',
                'accentColor': '#005CA9',
                'backdropText': 'AL-NASSR FC'
            }
        )

        # 10. Arsenal FC 2005-06 O2 Highbury Retro
        Product.objects.create(
            name='Arsenal FC 2005-06 O2 Highbury Retro',
            slug='arsenal-05-06-retro',
            description='The legendary Nike Arsenal 2005-06 Highbury farewell Redcurrant home jersey. Featuring gold embroidery and the iconic pristine white O2 sponsor graphic across the chest.',
            price=135.00,
            category=five_sleeve,
            image_url='/arsenal_jersey.png',
            rating=4.96,
            colors='Redcurrant, Gold',
            is_featured=True,
            details=[
                'PLAYER: HENRY',
                'REGULAR FIT',
                'HERITAGE MESH MATERIAL',
                'REDCURRANT COLLAR & GOLD EMBROIDERY'
            ],
            stats={
                'ranking': '2 (EPL)',
                'founded': '1886',
                'country': 'England',
                'recentMatch': 'Wigan 4-2 (W)',
                'matchTitle': 'FAREWELL HIGHBURY: THIERRY HENRY BIDS FAREWELL WITH HAT-TRICK',
                'bgColor': 'from-[#800020] to-[#E3C488]',
                'accentColor': '#E3C488',
                'backdropText': 'ARSENAL FC'
            }
        )

        # 11. Manchester United 1998-99 Sharp Retro
        Product.objects.create(
            name='Manchester United 1998-99 Sharp Retro',
            slug='manchester-united-98-99-retro',
            description='The iconic Umbro Manchester United 1998-99 Home Jersey from the historic Treble-winning season. Classic zip-neck collar, devil red base, and retro white-lined sponsor panels.',
            price=140.00,
            category=five_sleeve,
            image_url='/united_jersey.png',
            rating=4.97,
            colors='Devil Red, White, Black',
            is_featured=True,
            details=[
                'PLAYER: BECKHAM',
                'REGULAR FIT',
                'RETRO POLY MATERIAL',
                'ZIP-NECK POLO & FULL SLEEVE & EMBROIDERY'
            ],
            stats={
                'ranking': '3 (EPL)',
                'founded': '1878',
                'country': 'England',
                'recentMatch': 'Bayern Munich 2-1 (W)',
                'matchTitle': 'CAMP NOU MIRACLE: INJURY TIME DRAMA SECURES HISTORIC TREBLE',
                'bgColor': 'from-[#DA291C] to-black',
                'accentColor': '#FFFFFF',
                'backdropText': 'MAN UNITED'
            }
        )

        # 12. Manchester City Retro Kit
        Product.objects.create(
            name='Manchester City 1998-99 Play-Off Retro Kit',
            slug='man-city-98-99-retro',
            description='The legendary Kappa Manchester City 1998-99 Away Kit, worn during the historic Play-Off final comeback at Wembley. Featuring the iconic luminous yellow and navy vertical stripes, vintage embroidered crest, and the classic Brother sponsor logo.',
            price=128.00,
            category=five_sleeve,
            image_url='/arg_jersey.png',
            rating=4.90,
            colors='Luminous Yellow, Navy Blue',
            is_featured=True,
            details=[
                'PLAYER: DICKOV',
                'REGULAR FIT',
                'VINTAGE KAPPA PATTERN',
                'EMBROIDERED SHIELD & SHORT SLEEVE'
            ],
            stats={
                'ranking': '1 (EPL)',
                'founded': '1880',
                'country': 'England',
                'recentMatch': 'Gillingham 2-2 (4-3 P) (W)',
                'matchTitle': 'WEMBLEY DRAMA: DICKOV LATE EQUALIZER SPARKS MIRACLE PROMOTION',
                'bgColor': 'from-[#6CABDD] to-[#1C2C5B]',
                'accentColor': '#6CABDD',
                'backdropText': 'MAN CITY'
            }
        )

        # 13. Santos FC Retro Kit
        Product.objects.create(
            name='Santos FC 1962 Pele Retro Home Kit',
            slug='santos-1962-retro',
            description='The legendary all-white Santos FC Home Kit worn by Pelé during the historic 1962 Intercontinental Cup campaign. Features pristine vintage heavy-cotton embroidery and the classic CBD shield.',
            price=138.00,
            category=five_sleeve,
            image_url='/madrid_jersey.png',
            rating=4.99,
            colors='Pristine White',
            is_featured=True,
            details=[
                'PLAYER: PELÉ',
                'REGULAR FIT',
                'HEAVY COTTON MEMORY',
                'HISTORIC RETRO EMBROIDERY & SHORT SLEEVE'
            ],
            stats={
                'ranking': '1 (Paulista)',
                'founded': '1912',
                'country': 'Brazil',
                'recentMatch': 'Benfica 5-2 (W)',
                'matchTitle': 'LISBON INVASION: PELE SCORE HAT-TRICK TO CLAIM WORLD CHAMPIONSHIP',
                'bgColor': 'from-[#000000] to-[#FFFFFF]',
                'accentColor': '#A1A1A1',
                'backdropText': 'SANTOS FC'
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with 13 premium kits!'))

