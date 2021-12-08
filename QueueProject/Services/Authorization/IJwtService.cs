using QueueProject.Services.Authorization.Models;

namespace QueueProject.Services.Authorization
{
    public interface IJwtService
    {
        public string GetToken(JwtUser user);
    }
}
