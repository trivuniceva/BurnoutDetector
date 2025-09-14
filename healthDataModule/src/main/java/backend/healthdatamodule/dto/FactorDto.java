package backend.healthdatamodule.dto;

public class FactorDto {
    private String name;
    private String value;

    public FactorDto() {}

    public FactorDto(String name, Object value) {
        this.name = name;
        this.value = value != null ? value.toString() : null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}