// This what really makes the magic
import axios from "axios";
import "dotenv/config";

const api_key = process.env.DOMAIN_CHECK_API_KEY;

class NamesGeneration {
  // Checking the generated Names if they available for domain registration
  async checkDomainsAvailability(domains) {
    const availableOnes = [];
    for (let domain of domains) {
      const { data } = await axios.get(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_1X9DXLQvisKWyxfyaOMYLWSfSpZ99&domainName=${domain}.com&credits=DA`
      )

      if (data.DomainInfo.domainAvailability) {
        availableOnes.push(data.DomainInfo.domainName);
      }
    }

    return availableOnes;
  }


  async __init__(term_category) {
    try {
      const { data: domains } = await axios.get(
        "http://names.drycodes.com/8"
      );

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
