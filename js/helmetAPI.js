const api1 = "https://api.finna.fi/api/v1/search?type=AllFields&filter[]=building%3A%220%2FHelmet%2F%22&filter[]=format:%221/Book/Book/%22&filter[]=language%3A%22eng%22&filter[]=genre_facet%3A%22Mangat%22&sort=first_indexed+desc&page=";
const api2 = "&limit=";
const api3 = "&prettyPrint=true&lng=en-gb";

async function batchExists(ids) {
  const response = await fetch('../php/exists_batch.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids })
  });

  const json = await response.json();
  return new Set(json.existing);
}

async function getEntries(amount, page = 1) {
  const newdata = [];

  if (amount === "new") {
    while (true) {
      const api = `${api1}${page}${api2}100${api3}`;
      const response = await fetch(api);
      const json = await response.json();

      const records = json.records.map(r => ({
        ...r,
        id: r.id.replace("helmet.", "")
      }));

      const ids = records.map(r => r.id);
      const existing = await batchExists(ids);

      let foundNewOnPage = false;

      for (const record of records) {
        if (!existing.has(record.id)) {
          newdata.push(record);
          foundNewOnPage = true;
        } else {
          console.log(newdata);
          return;
        }
      }

      if (!foundNewOnPage) break;
      page++;
    }
  }

  else if (Number.isInteger(amount) && amount > 0) {
    let remaining = amount;

    while (remaining > 0) {
      const limit = Math.min(100, remaining);
      const api = `${api1}${page}${api2}${limit}${api3}`;

      const response = await fetch(api);
      const json = await response.json();

      const records = json.records.map(r => ({
        ...r,
        id: r.id.replace("helmet.", "")
      }));

      const ids = records.map(r => r.id);
      const existing = await batchExists(ids);

      for (const record of records) {
        if (!existing.has(record.id)) {
          newdata.push(record);
        } else {
          console.log(newdata);
          return;
        }
      }

      remaining -= limit;
      page++;
    }
  }
  console.log(newdata);
  
}
