import os
from collections import defaultdict
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_published_properties():
    """
    Fetch published properties from Supabase.
    """
    response = (
        supabase
        .table("properties")
        .select("city, price")
        .eq("is_published", True)
        .execute()
    )

    if response.data is None:
        return []

    return response.data


def compute_statistics(properties):
    """
    Compute number of properties and average price per city.
    """
    stats = defaultdict(list)

    for prop in properties:
        city = prop.get("city")
        price = prop.get("price")

        # Ignore invalid prices
        if city and price and price > 0:
            stats[city].append(price)

    results = []

    for city, prices in stats.items():
        count = len(prices)
        avg_price = sum(prices) / count
        results.append((city, count, avg_price))

    return results


def display_statistics(results):
    """
    Display formatted statistics in console.
    """
    print("\n📊 Real Estate Statistics (Published Properties)\n")
    print("-" * 50)

    for city, count, avg_price in sorted(results):
        print(f"🏙️  City: {city}")
        print(f"   • Number of properties: {count}")
        print(f"   • Average price: {avg_price:,.2f} €")
        print("-" * 50)


def main():
    print("🔎 Fetching data from Supabase...")
    properties = fetch_published_properties()

    if not properties:
        print("⚠️ No published properties found.")
        return

    stats = compute_statistics(properties)
    display_statistics(stats)


if __name__ == "__main__":
    main()