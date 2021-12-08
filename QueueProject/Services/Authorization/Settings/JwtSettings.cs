using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace QueueProject.Services.Authorization.Settings
{
    public class JwtSettings
    {
        public const string ISSUER = "QueueProjectt";
        public const string AUDIENCE = "QueueProjectClient";
        private static readonly string KEY = RandomKey.CreateKey(30);
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
