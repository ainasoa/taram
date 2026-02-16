import os
from collections import defaultdict
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_published_properties():
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
    stats = defaultdict(list)

    for prop in properties:
        city = prop.get("city")
        price = prop.get("price")

        stats[city].append(price)

    results = []

    for city, prices in stats.items():
        count = len(prices)
        avg_price = sum(prices) / count
        results.append((city, count, avg_price))

    return results

def display_statistics(results):
    for city, count, avg_price in results:
        print(f"Ville: {city}")
        print(f"Number of properties: {count}")
        print(f"Average price: {avg_price:,.2f} €")

def main():
    print("Chargement en cours...")
    properties = fetch_published_properties()

    if not properties:
        print("Liste vide")
        return

    stats = compute_statistics(properties)
    display_statistics(stats)

if __name__ == "__main__":
    main()