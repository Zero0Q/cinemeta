const axios = require("axios");
const endpoint =
  "https://cinemeta.strem.io/stremioget/stremio/v1/q.json?b=eyJwYXJhbXMiOltudWxsLHt9XSwibWV0aG9kIjoibmFtZXMubW92aWUiLCJpZCI6MSwianNvbnJwYyI6IjIuMCJ9";

const searchDB = (searchStr) => (item) =>
  item.imdb_id === searchStr || item.name === searchStr;

class Cinemeta {
  /**
   *
   * @param {*} input Title (Film Name) or IMDB ID (e.g: tt8861802)
   * @returns Structured Data from Cinemeta: (e.g: { id: 'tt8861802', name: 'How High 2', year: '2019'})
   */
  async search(input) {
    try {
      let res = await axios.get(endpoint);
      let searchFor = searchDB(input);
      const result = res.data.result.filter(searchFor);
      
      if (result.length === 0) {
        throw new Error('No results found');
      }

      const structure = {
        title: result[0].name,
        id: result[0].imdb_id,
        year: result[0].year,
        providers: {
          database: "cinemeta.strem.io",
        },
      };
      return structure;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

module.exports = new Cinemeta();
