const buildForNetsuite = false

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: 'export',
  webpack(config){
    
    if(buildForNetsuite){
      config.output.publicPath = '/app/site/hosting/scriptlet.nl?script=customscript_cm_st_schedule_queue_manage&deploy=customdeploy_cm_st_schedule_queue_manage&resource=/_next/'
    }

    return config
  }
}

export default nextConfig
