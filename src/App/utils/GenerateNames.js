// This what really makes the magic
import axios from "axios";
import "dotenv/config";

const api_key = process.env.DOMAIN_CHECK_API_KEY;
console.log(api_key);

class NamesGeneration {
  // Checking the generated Names if they available for domain registration
  async checkDomainsAvailability(domains) {
    const availableOnes = [];
    for (let domain of domains) {
      const { data } = await axios.get(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${api_key}&domainName=${domain}&credits=DA`
      );

      if (data.DomainInfo.domainAvailability) {
        availableOnes.push(data.DomainInfo.domainName);
      }
    }

    return availableOnes;
  }

  // Format the Names
  formatName(string) {
    let formatted = `${string.split("_")[0]}${string.split("_")[1]}.com`;
    return formatted.toLowerCase();
  }

  async __init__(term_category) {
    try {
      const domains = [];
      const { data } = await axios.get(
        "http://names.drycodes.com/5?nameOptions=" + term_category
      );

      for (let element of data) {
        domains.push(this.formatName(element));
      }

      const availableGeneratedDomains = await this.checkDomainsAvailability(
        domains
      );

      return { data: availableGeneratedDomains };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new NamesGeneration();
