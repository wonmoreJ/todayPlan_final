package app.todayplan.toplan.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.zaxxer.hikari.HikariDataSource;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class EnvConfig {
    @Bean
    public DataSource dataSource(){
        Dotenv dotenv = Dotenv.load();
        HikariDataSource  dataSource = new HikariDataSource();

        dataSource.setJdbcUrl(dotenv.get("DB_URL"));
        dataSource.setUsername(dotenv.get("DB_USERNAME"));
        dataSource.setPassword(dotenv.get("DB_PASSWORD"));
        return dataSource;
    }
}
