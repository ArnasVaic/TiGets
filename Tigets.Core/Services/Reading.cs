namespace Tigets.Core.Services
{
    public class Reading
    {
        public string AppInfo { get; }

        private Reading()
        {
            AppInfo = ReadFromFile();
        }

        private string ReadFromFile()
        {
            string appInfo;
            string path = Path.Combine(Directory.GetCurrentDirectory() + "\\Resources\\AppInformation.txt");
            try
            {
                using StreamReader sr = new StreamReader(path);
                appInfo = sr.ReadToEnd();
            }
            catch
            {
                appInfo = "The information about this app cannot be provided currently.";
            }

            return appInfo;
        }
    }
}